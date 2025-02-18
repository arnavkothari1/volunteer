import { Router, Request, Response } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { getModels } from '../../models';

const router = Router();
const { User, Path, Progress } = getModels();

router.get('/admin/metrics', authMiddleware, async (req: Request, res: Response) => {
  try {
    const activeUserIds = await Progress.distinct('userId');
    
    const metrics = {
      users: await User.countDocuments(),
      paths: await Path.countDocuments(),
      activeUsers: activeUserIds.length,
      completedPaths: await Progress.countDocuments({ isCompleted: true }),
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

export default router; 