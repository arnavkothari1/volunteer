import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.put('/update-profile', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, userType } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        location,
        userType
      }
    });

    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      error: 'Failed to update profile',
      details: error?.message 
    });
  }
});

export default router; 