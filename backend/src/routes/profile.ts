import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, userType } = req.body;
    const userId = req.user?.id;

    console.log('Profile update:', { userId, location, userType });

    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        location,
        userType
      }
    });

    console.log('Updated user:', updatedUser);

    // Set redirect path based on user type
    const redirectPath = userType === 'ORGANIZER' 
      ? '/company/create'
      : '/dashboard/student';

    res.json({
      success: true,
      user: updatedUser,
      redirectPath
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      error: 'Failed to update profile',
      details: error.message 
    });
  }
});

export default router;