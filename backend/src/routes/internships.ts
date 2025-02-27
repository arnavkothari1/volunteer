import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';
import { authorizeRole } from '../middleware/auth';
import { Request, Response } from 'express';
import upload from '../middleware/upload';

const router = express.Router();
const prisma = new PrismaClient();

// Get all internships (for students)
router.get('/', authenticate, async (req, res) => {
  try {
    const internships = await prisma.internship.findMany({
      include: {
        company: {
          select: {
            name: true,
            location: true
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

// Get company's internships (for organizer dashboard)
router.get('/company', authenticate, authorizeRole(['ORGANIZER']), async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { 
        organizerId: req.user?.id 
      }
    });

    if (!company) {
      res.status(404).json({ 
        success: false, 
        message: 'Company not found' 
      });
      return;
    }

    const internships = await prisma.internship.findMany({
      where: { 
        companyId: company.id 
      },
      include: {
        applications: true
      }
    });

    console.log('Found internships for company:', internships);

    res.json({ 
      success: true, 
      internships 
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch internships' 
    });
  }
});

// Get single internship details
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await prisma.internship.findUnique({
      where: { id }
    });
    res.json({ success: true, internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch internship' });
  }
});

// Create new internship
router.post('/', authenticate, authorizeRole(['ORGANIZER']), async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { organizerId: req.user.id }
    });

    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    const internship = await prisma.internship.create({
      data: {
        ...req.body,
        companyId: company.id,
        status: 'OPEN'
      }
    });

    res.json({ success: true, internship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create internship' });
  }
});

// Apply for internship - only for STUDENT role
router.post('/:id/apply', 
  authenticate, 
  upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'tenthMarksheet', maxCount: 1 }
  ]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params; // internship id
      const studentId = req.user?.id; // get student id from authenticated user

      if (!studentId) {
        res.status(401).json({ 
          success: false, 
          message: 'User not authenticated' 
        });
        return;
      }

      // Get the form data
      const { fullName, email, skills, coverLetter } = req.body;
      
      // Get the file paths from multer upload
      const aadharCard = req.files?.['aadharCard']?.[0]?.path;
      const tenthMarksheet = req.files?.['tenthMarksheet']?.[0]?.path;

      if (!aadharCard || !tenthMarksheet) {
        res.status(400).json({
          success: false,
          message: 'Required documents are missing'
        });
        return;
      }

      // Create the application in the database
      const application = await prisma.application.create({
        data: {
          studentId,
          internshipId: id,
          status: 'PENDING',
          fullName,
          email,
          skills: Array.isArray(skills) ? skills : JSON.parse(skills),
          coverLetter,
          aadharCard,
          tenthMarksheet,
        }
      });

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        application
      });

    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit application',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

// Update internship status
router.patch('/:id/status', authenticate, authorizeRole(['ORGANIZER']), async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const company = await prisma.company.findUnique({
      where: { organizerId: req.user.id }
    });

    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    // Verify the internship belongs to the company
    const internship = await prisma.internship.findFirst({
      where: {
        id,
        companyId: company.id
      }
    });

    if (!internship) {
      res.status(404).json({ error: 'Internship not found' });
      return;
    }

    const updatedInternship = await prisma.internship.update({
      where: { id },
      data: { status }
    });

    res.json(updatedInternship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update internship status' });
  }
});

// Update application status
router.patch('/applications/:id/status', authenticate, authorizeRole(['ORGANIZER']), async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verify the application belongs to the company
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        internship: {
          include: {
            company: true
          }
        }
      }
    });

    if (!application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    // Verify the company belongs to the organizer
    const company = await prisma.company.findUnique({
      where: { organizerId: req.user.id }
    });

    if (!company || application.internship.company.id !== company.id) {
      res.status(403).json({ error: 'Not authorized to update this application' });
      return;
    }

    // Update the application status
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status }
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

// Get all available internships
router.get('/available', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching available internships...'); // Debug log
    console.log('User:', req.user); // Debug log

    const internships = await prisma.internship.findMany({
      where: {
        status: 'OPEN'
      },
      include: {
        company: {
          select: {
            name: true,
            industry: true,
            location: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Found internships:', internships); // Debug log

    res.json({
      success: true,
      internships
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch internships',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 