import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get current company
router.get('/current', authenticate, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { organizerId: req.user?.id }
    });
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch company' });
  }
});

// Get all companies
router.get('/companies', async (_req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        organizer: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Get company by organizer ID
router.get('/organizer/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
      where: { organizerId: id }
    });
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch company' });
  }
});

// Get company by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
      where: { id }
    });
    res.json({ success: true, company });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch company' });
  }
});

// Check if company exists for current user
router.get('/check', authenticate, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { organizerId: req.user?.id }
    });
    res.json({ success: true, exists: !!company });
  } catch (error) {
    console.error('Error checking company:', error);
    res.status(500).json({ success: false, message: 'Failed to check company' });
  }
});

// Create company
router.post('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, location, email, industry, mission, benefits, position, occupiedPositions } = req.body;

    // Check if user already has a company
    const existingCompany = await prisma.company.findUnique({
      where: { organizerId: req.user?.id }
    });

    if (existingCompany) {
      res.status(400).json({
        success: false,
        message: 'You already have a company profile'
      });
      return;
    }

    const company = await prisma.company.create({
      data: {
        name,
        description,
        location,
        email,
        industry,
        mission,
        benefits,
        position,
        occupiedPositions: parseInt(occupiedPositions),
        organizer: {
          connect: { id: req.user?.id }
        }
      }
    });

    res.json({
      success: true,
      company
    });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create company'
    });
  }
});

// Get company profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { organizerId: req.user?.id }
    });
    res.json({ success: true, company });
  } catch (error) {
    console.error('Error fetching company profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch company profile' });
  }
});

// Debug route
router.get('/debug', authenticate, async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json({ success: true, companies });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch companies' });
  }
});

export default router;