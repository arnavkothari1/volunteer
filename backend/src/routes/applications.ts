import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Test route - remove after testing
router.post('/test', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received test application:', req.body);
    res.status(200).json({ message: 'Test endpoint working' });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ error: 'Test failed' });
  }
});

// Main application route
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { companyId } = req.body;
    const userId = req.user?.id;

    if (!userId || !companyId) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Check if application already exists
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId,
        companyId
      }
    });

    if (existingApplication) {
      res.status(400).json({ error: 'Application already exists' });
      return;
    }

    // First get the company's internship
    const internship = await prisma.internship.findFirst({
      where: { companyId }
    });

    if (!internship) {
      res.status(404).json({ error: 'No internship found for this company' });
      return;
    }

    // Create application with the found internship ID
    const application = await prisma.application.create({
      data: {
        userId,
        companyId,
        internshipId: internship.id,
        status: 'PENDING',
        coverLetter: '',
        requirements: [],
        skills: [],
        contactEmail: req.user?.email || '',
        contactPhone: ''
      }
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Get applications for internship
router.get('/internship/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        internshipId: req.params.id
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
    
    res.json(applications);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get applications for a user
router.get('/user/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    console.log('fetching applications for user:', userId);

    // Get user to check role
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    let applications;
    if (user.userType === 'ORGANIZER') {
      // If organizer, get applications for their company's internships
      const company = await prisma.company.findFirst({
        where: { organizerId: userId }
      });

      if (!company) {
        res.status(404).json({ error: 'Company not found' });
        return;
      }

      applications = await prisma.application.findMany({
        where: {
          internship: {
            companyId: company.id
          }
        },
        include: {
          internship: true,
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      });
    } else {
      // If student, get their applications
      applications = await prisma.application.findMany({
        where: {
          userId: userId
        },
        include: {
          internship: {
            include: {
              company: true
            }
          }
        }
      });
    }

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get applications for a company
router.get('/company/:companyId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { companyId } = req.params;
    console.log('Fetching applications for company:', companyId);

    const applications = await prisma.application.findMany({
      where: {
        companyId
      },
      select: {
        id: true,
        status: true,
        coverLetter: true,
        requirements: true,
        skills: true,
        contactEmail: true,
        contactPhone: true,
        createdAt: true,
        internship: {
          select: {
            title: true,
            description: true
          }
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    console.log('Found applications:', applications);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Update application status
router.put('/:id/status', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, statusMessage } = req.body;

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: {
        status,
        statusMessage
      },
      include: {
        internship: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

export default router; 