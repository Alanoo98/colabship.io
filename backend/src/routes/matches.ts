import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Get potential matches for user
router.get('/potential', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    // Get user's needs and preferences
    const userNeeds = await prisma.userNeed.findMany({
      where: { userId: req.userId },
      include: { skill: true }
    });

    const userOffers = await prisma.userOffer.findMany({
      where: { userId: req.userId },
      include: { skill: true }
    });

    // Get skills the user is looking for
    const neededSkillIds = userNeeds.map(need => need.skillId);
    const offeredSkillIds = userOffers.map(offer => offer.skillId);

    // Find users who have skills the current user needs
    const potentialMatches = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: req.userId } },
          { isActive: true },
          { isOnboarded: true },
          {
            offers: {
              some: {
                skillId: { in: neededSkillIds }
              }
            }
          }
        ]
      },
      include: {
        offers: {
          include: {
            skill: true
          }
        },
        needs: {
          include: {
            skill: true
          }
        }
      },
      skip: offset,
      take: Number(limit)
    });

    // Calculate match scores (simplified algorithm)
    const matchesWithScores = potentialMatches.map(match => {
      const commonSkills = match.offers.filter(offer => 
        neededSkillIds.includes(offer.skillId)
      );
      
      const skillMatchScore = (commonSkills.length / neededSkillIds.length) * 100;
      
      return {
        ...match,
        matchScore: Math.round(skillMatchScore)
      };
    });

    // Sort by match score
    matchesWithScores.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      matches: matchesWithScores,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: matchesWithScores.length
      }
    });
  } catch (error) {
    console.error('Get potential matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's matches
router.get('/', authenticateToken, async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { userAId: req.userId },
          { userBId: req.userId }
        ]
      },
      include: {
        userA: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            bio: true
          }
        },
        userB: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            bio: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ matches });
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like a user
router.post('/:userId/like', authenticateToken, async (req, res) => {
  try {
    const { userId: targetUserId } = req.params;

    if (targetUserId === req.userId) {
      return res.status(400).json({ error: 'Cannot like yourself' });
    }

    // Check if match already exists
    let match = await prisma.match.findFirst({
      where: {
        OR: [
          { userAId: req.userId, userBId: targetUserId },
          { userAId: targetUserId, userBId: req.userId }
        ]
      }
    });

    if (!match) {
      // Create new match
      match = await prisma.match.create({
        data: {
          userAId: req.userId,
          userBId: targetUserId,
          userALiked: true,
          userBLiked: false
        }
      });
    } else {
      // Update existing match
      const isUserA = match.userAId === req.userId;
      
      match = await prisma.match.update({
        where: { id: match.id },
        data: {
          userALiked: isUserA ? true : match.userALiked,
          userBLiked: !isUserA ? true : match.userBLiked,
          status: (isUserA ? match.userBLiked : match.userALiked) ? 'accepted' : 'pending'
        }
      });
    }

    // Record interaction
    await prisma.matchInteraction.create({
      data: {
        matchId: match.id,
        userId: req.userId,
        action: 'like'
      }
    });

    res.json({ match });
  } catch (error) {
    console.error('Like user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Skip a user
router.post('/:userId/skip', authenticateToken, async (req, res) => {
  try {
    const { userId: targetUserId } = req.params;

    // Record interaction
    await prisma.matchInteraction.create({
      data: {
        matchId: null, // No match created for skip
        userId: req.userId,
        action: 'skip'
      }
    });

    res.json({ message: 'User skipped' });
  } catch (error) {
    console.error('Skip user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get match details
router.get('/:matchId', authenticateToken, async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        userA: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            bio: true,
            experienceLevel: true,
            timezone: true,
            workStyle: true
          }
        },
        userB: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            bio: true,
            experienceLevel: true,
            timezone: true,
            workStyle: true
          }
        },
        interactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Check if user is part of this match
    if (match.userAId !== req.userId && match.userBId !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ match });
  } catch (error) {
    console.error('Get match error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
