import { Router, Request, Response } from 'express';
import { authenticate, authorizeRole } from '../middleware/auth';
import { prisma } from '../lib/db';

const router = Router();

// Protected routes for students
router.get('/student/applications', authenticate, authorizeRole(['STUDENT']), async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await prisma.application.findMany({
      where: { studentId: req.user!.id },
      include: {
        internship: {
          include: { company: true }
        }
      }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Protected routes for organizers
router.get('/organizer/company', authenticate, authorizeRole(['ORGANIZER']), async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        organizerId: req.user!.id
      },
      include: {
        internships: true,
        tasks: true
      }
    });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch company data' });
  }
});

// Internship management for organizers
router.post('/internship', authenticate, authorizeRole(['ORGANIZER']), async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        organizerId: req.user!.id
      },
      include: {
        internships: true,
        tasks: true
      }
    });
    const internship = await prisma.internship.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        requirements: req.body.requirements,
        companyId: company.id,
        status: 'OPEN',
        isRemote: req.body.isRemote || false
      }
    });
    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create internship' });
  }
});

// Application management
router.post('/application/:internshipId', authenticate, authorizeRole(['STUDENT']), async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        organizerId: req.user!.id
      },
      include: {
        internships: true,
        tasks: true
      }
    });
    const application = await prisma.application.create({
      data: {
        student: {
          connect: {
            id: req.user.id
          }
        },
        internship: {
          connect: {
            id: req.params.internshipId
          }
        },
        fullName: req.body.fullName,
        email: req.body.email,
        skills: req.body.skills,
        coverLetter: req.body.coverLetter,
        aadharCard: req.body.aadharCard,
        tenthMarksheet: req.body.tenthMarksheet,
        status: 'PENDING'
      }
    });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create application' });
  }
});

export default router; 