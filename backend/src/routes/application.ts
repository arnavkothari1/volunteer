import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all applications for an internship
router.get('/internship/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const internship = await prisma.internship.findFirst({
      where: {
        id,
        company: {
          organizerId: req.user?.id
        }
      },
      include: {
        applications: {
          include: {
            student: {
              select: {
                email: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    if (!internship) {
      res.status(404).json({
        success: false,
        message: 'Internship not found or unauthorized'
      });
      return;
    }

    const applications = internship.applications;
    res.json({
      success: true,
      applications: applications.map(app => ({
        id: app.id,
        fullName: `${app.student.firstName} ${app.student.lastName}`,
        email: app.student.email,
        status: app.status,
        skills: app.skills,
        coverLetter: app.coverLetter,
        aadharCard: app.aadharCard,
        tenthMarksheet: app.tenthMarksheet,
        createdAt: app.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Update application status
router.patch('/:id/status', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await prisma.application.findFirst({
      where: {
        id,
        internship: {
          company: {
            organizerId: req.user?.id
          }
        }
      }
    });

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized'
      });
      return;
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status }
    });

    res.json({
      success: true,
      application: updatedApplication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update application status'
    });
  }
});

// Add this new route for getting a single application
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.findFirst({
      where: {
        id,
        internship: {
          company: {
            organizerId: req.user?.id
          }
        }
      },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        internship: {
          select: {
            title: true,
            company: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized'
      });
      return;
    }

    res.json({
      success: true,
      application: {
        id: application.id,
        fullName: `${application.student.firstName} ${application.student.lastName}`,
        email: application.student.email,
        status: application.status,
        skills: application.skills,
        coverLetter: application.coverLetter,
        aadharCard: application.aadharCard,
        tenthMarksheet: application.tenthMarksheet,
        createdAt: application.createdAt,
        internship: {
          title: application.internship.title,
          company: {
            name: application.internship.company.name
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application details'
    });
  }
});

router.post('/:internshipId', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { internshipId } = req.params;
    const { fullName, email, skills, coverLetter, aadharCard, tenthMarksheet } = req.body;

    const application = await prisma.application.create({
      data: {
        internship: {
          connect: { id: internshipId }
        },
        student: {
          connect: { id: req.user?.id }
        },
        status: 'PENDING',
        fullName,
        email,
        skills,
        coverLetter,
        aadharCard,
        tenthMarksheet
      }
    });

    res.json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create application'
    });
  }
});

// Add this new route BEFORE the /:id route to avoid path conflicts
router.get('/student/applications', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const applications = await prisma.application.findMany({
      where: {
        studentId: studentId
      },
      include: {
        internship: {
          include: {
            company: {
              select: {
                name: true,
                industry: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Error fetching student applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

export default router; 