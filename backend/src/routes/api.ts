import express from 'express';
import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';
import { AsyncRequestHandler } from '../types/express';

const router = express.Router();

const getProfile: AsyncRequestHandler = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { company: true }
    });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ success: true, profile: user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

// Get user applications
router.get('/applications', authenticate, async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { 
        studentId: req.user!.id  // Use the authenticated user's ID instead of session
      },
      include: {
        internship: {
          include: {
            company: {
              select: {
                name: true,
                location: true
              }
            }
          }
        }
      }
    });

    res.json({ success: true, applications });
  } catch (error) {
    console.error('Applications error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

router.get('/profile', authenticate, getProfile);

export default router; 