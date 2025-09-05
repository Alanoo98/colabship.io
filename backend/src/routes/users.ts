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

  // In production, verify JWT token here
  // For now, we'll extract user ID from token
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
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
        },
        matchPreferences: true,
        projectInterests: true,
        collaborationPrefs: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const updateSchema = Joi.object({
      name: Joi.string().min(2).max(100).optional(),
      bio: Joi.string().max(500).optional(),
      avatarUrl: Joi.string().uri().optional(),
      githubUrl: Joi.string().uri().optional(),
      linkedinUrl: Joi.string().uri().optional(),
      portfolioUrl: Joi.string().uri().optional(),
      experienceLevel: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').optional(),
      timezone: Joi.string().optional(),
      availabilityHours: Joi.number().min(0).max(168).optional(),
      workStyle: Joi.string().valid('async', 'sync', 'hybrid').optional(),
      commsPref: Joi.string().valid('text', 'video', 'mixed').optional(),
      values: Joi.array().items(Joi.string()).optional(),
    });

    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: value
    });

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user skills (offers)
router.get('/skills/offers', authenticateToken, async (req, res) => {
  try {
    const offers = await prisma.userOffer.findMany({
      where: { userId: req.userId },
      include: {
        skill: true
      }
    });

    res.json({ offers });
  } catch (error) {
    console.error('Get offers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add skill offer
router.post('/skills/offers', authenticateToken, async (req, res) => {
  try {
    const schema = Joi.object({
      skillId: Joi.number().required(),
      proficiency: Joi.number().min(1).max(5).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const offer = await prisma.userOffer.upsert({
      where: {
        userId_skillId: {
          userId: req.userId,
          skillId: value.skillId
        }
      },
      update: {
        proficiency: value.proficiency
      },
      create: {
        userId: req.userId,
        skillId: value.skillId,
        proficiency: value.proficiency
      },
      include: {
        skill: true
      }
    });

    res.json({ offer });
  } catch (error) {
    console.error('Add offer error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove skill offer
router.delete('/skills/offers/:skillId', authenticateToken, async (req, res) => {
  try {
    const skillId = parseInt(req.params.skillId);
    
    await prisma.userOffer.delete({
      where: {
        userId_skillId: {
          userId: req.userId,
          skillId
        }
      }
    });

    res.json({ message: 'Offer removed successfully' });
  } catch (error) {
    console.error('Remove offer error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user needs
router.get('/skills/needs', authenticateToken, async (req, res) => {
  try {
    const needs = await prisma.userNeed.findMany({
      where: { userId: req.userId },
      include: {
        skill: true
      }
    });

    res.json({ needs });
  } catch (error) {
    console.error('Get needs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add skill need
router.post('/skills/needs', authenticateToken, async (req, res) => {
  try {
    const schema = Joi.object({
      skillId: Joi.number().required(),
      mustHave: Joi.boolean().optional(),
      priority: Joi.number().min(1).max(5).optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const need = await prisma.userNeed.upsert({
      where: {
        userId_skillId: {
          userId: req.userId,
          skillId: value.skillId
        }
      },
      update: {
        mustHave: value.mustHave || false,
        priority: value.priority || 3
      },
      create: {
        userId: req.userId,
        skillId: value.skillId,
        mustHave: value.mustHave || false,
        priority: value.priority || 3
      },
      include: {
        skill: true
      }
    });

    res.json({ need });
  } catch (error) {
    console.error('Add need error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove skill need
router.delete('/skills/needs/:skillId', authenticateToken, async (req, res) => {
  try {
    const skillId = parseInt(req.params.skillId);
    
    await prisma.userNeed.delete({
      where: {
        userId_skillId: {
          userId: req.userId,
          skillId
        }
      }
    });

    res.json({ message: 'Need removed successfully' });
  } catch (error) {
    console.error('Remove need error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark user as onboarded
router.post('/onboard', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { isOnboarded: true }
    });

    res.json({ user });
  } catch (error) {
    console.error('Onboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
