import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get current company (MUST come before /:id route)
router.get('/current', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    console.log('Fetching company for user:', userId); // Debug log

    const company = await prisma.company.findFirst({
      where: {
        organizerId: userId
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        internships: true
      }
    });

    if (!company) {
      res.status(404).json({ 
        error: 'No company found',
        shouldRedirect: true 
      });
      return;
    }

    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// Get all companies
router.get('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching all companies');
    const companies = await prisma.company.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        internships: true
      }
    });

    console.log('Found companies:', companies);
    res.json(companies);
  } catch (error) {
    console.error('Company fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Get company by organizer ID
router.get('/organizer/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Fetching company for organizer:', id);

    const company = await prisma.company.findFirst({
      where: {
        organizerId: id
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        internships: true
      }
    });

    if (!company) {
      console.log('No company found for organizer:', id);
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    console.log('Found company:', company);
    res.json(company);
  } catch (error) {
    console.error('Company fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// Get company by ID (MUST come after more specific routes)
router.get('/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Fetching company by id:', id);

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        internships: true
      }
    });

    if (!company) {
      console.log('Company not found:', id);
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    console.log('Found company:', company);
    res.json(company);
  } catch (error) {
    console.error('Company fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// Create company
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    console.log('Creating company for user:', userId);

    const {
      name,
      description,
      userPosition,
      occupiedPositions,
      interests,
      location,
      isRemote
    } = req.body;

    const company = await prisma.company.create({
      data: {
        name,
        description,
        userPosition,
        occupiedPositions,
        interests,
        location,
        isRemote,
        organizerId: userId
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    console.log('Created company:', company);
    res.json(company);
  } catch (error) {
    console.error('Company creation error:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

export default router;