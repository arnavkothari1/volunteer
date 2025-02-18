import { RequestHandler } from 'express';
import { getStats } from '../services/statsService';

export const getUserStats: RequestHandler = async (req, res) => {
  try {
    const user = req.user as { _id: string } | undefined;
    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    const stats = await getStats(user._id);
    res.json({
      totalPaths: stats.totalPaths || 0,
      completedPaths: stats.completedPaths || 0,
      inProgressPaths: stats.inProgressPaths || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats' });
  }
}; 