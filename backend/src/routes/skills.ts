import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;

    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.name = {
        contains: search as string,
        mode: 'insensitive'
      };
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: {
        name: 'asc'
      }
    });

    res.json({ skills });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get skill categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.skill.findMany({
      select: {
        category: true
      },
      distinct: ['category'],
      orderBy: {
        category: 'asc'
      }
    });

    res.json({ categories: categories.map(c => c.category) });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get skill by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const skillId = parseInt(id);

    if (isNaN(skillId)) {
      return res.status(400).json({ error: 'Invalid skill ID' });
    }

    const skill = await prisma.skill.findUnique({
      where: { id: skillId }
    });

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json({ skill });
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
