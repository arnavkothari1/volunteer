import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getModels } from '../models';

const router = Router();
const { Path } = getModels();

router.post('/integration-test/path', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const path = await Path.create({
      ...req.body,
      creator: userId,  // Add creator field from auth
      category: req.body.category.toUpperCase()
    });
    
    res.status(201).json(path);
  } catch (error) {
    console.error('Integration test path creation error:', error);
    res.status(500).json({ error: 'Failed to create test path' });
  }
});

export default router; 