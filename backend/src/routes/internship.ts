import { Router, Request, Response } from 'express';
import { routeGuard } from '../middleware/routeAuth';
import { AuthRequest } from '../types/user';
import { prisma } from '../utils/prisma';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Create new internship
// @ts-ignore
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received request to create internship');
    console.log('Cookies:', req.cookies);
    
    const token = req.cookies.token;
    if (!token) {
      console.log('No token found in cookies');
      res.status(401).json({ error: 'Unauthorized - Please login' });
      return;
    }

    console.log('Token found, verifying...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    console.log('Token verified, user ID:', decoded.id);
    
    // Get the company to verify ownership
    const company = await prisma.company.findUnique({
      where: { organizerId: decoded.id }
    });

    if (!company) {
      console.log('No company found for user:', decoded.id);
      res.status(403).json({ error: 'Not authorized to create internships for this company' });
      return;
    }

    console.log('Creating internship with data:', req.body);
    
    const internship = await prisma.internship.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        skills: req.body.skills,
        workLocation: req.body.location,
        isRemote: req.body.isRemote,
        howToApply: req.body.howToApply,
        status: 'OPEN',
        company: {
          connect: { id: req.body.companyId }
        }
      }
    });

    console.log('Created internship:', internship);
    res.status(201).json(internship);
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(500).json({ error: 'Failed to create internship' });
  }
});

// Get all open internships
// @ts-ignore
router.get('/open', async (req: Request, res: Response): Promise<void> => {
  try {
    const internships = await prisma.internship.findMany({
      where: {
        status: 'OPEN'
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            location: true,
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    res.json(internships);
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

// Get all internships for a company
// @ts-ignore
router.get('/company', routeGuard, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const company = await prisma.company.findUnique({
      where: { organizerId: userId },
      include: {
        internships: true
      }
    });

    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    res.json(company.internships);
  } catch (error) {
    console.error('❌ Internship fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

// Update internship status
// @ts-ignore
router.patch('/:id', routeGuard, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const company = await prisma.company.findUnique({
      where: { organizerId: userId }
    });

    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    const internship = await prisma.internship.update({
      where: {
        id,
        companyId: company.id
      },
      data: req.body
    });

    res.json(internship);
  } catch (error) {
    console.error('❌ Internship update error:', error);
    res.status(500).json({ error: 'Failed to update internship' });
  }
});

// Add this route to your existing internship routes
router.get('/company/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const internships = await prisma.internship.findMany({
      where: {
        companyId: id,
        status: 'OPEN'
      },
      include: {
        company: {
          select: {
            name: true,
            location: true,
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    res.json(internships);
  } catch (error) {
    console.error('Error fetching company internships:', error);
    res.status(500).json({ error: 'Failed to fetch company internships' });
  }
});

// Get single internship
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Fetching internship with id:', id);

    const internship = await prisma.internship.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            name: true,
            location: true
          }
        }
      }
    });

    if (!internship) {
      console.log('Internship not found');
      res.status(404).json({ error: 'Internship not found' });
      return;
    }

    console.log('Found internship:', internship);
    res.json(internship);
  } catch (error) {
    console.error('Error fetching internship:', error);
    res.status(500).json({ error: 'Failed to fetch internship' });
  }
});

export default router; 