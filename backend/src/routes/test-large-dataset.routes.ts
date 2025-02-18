import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getModels } from '../models';

const router = Router();
const { Path } = getModels();

router.post('/large-path', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    // Explicitly get user._id from auth middleware
    const userId = (req as any).user?._id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const path = await Path.create({
      ...req.body,
      creator: userId,  // Ensure creator is set
      category: req.body.category.toUpperCase(),
      collaborators: []
    });
    
    res.status(201).json(path);
  } catch (error) {
    console.error('Large path creation error:', error);
    res.status(500).json({ error: 'Failed to create large path' });
  }
});

// Additional test route for edge case
router.post('/edge-cases/edge-case-path', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?._id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const path = await Path.create({
      ...req.body,
      creator: userId,
      category: req.body.category.toUpperCase(),
      collaborators: []
    });
    
    res.status(201).json(path);
  } catch (error) {
    console.error('Large path creation error:', error);
    res.status(500).json({ error: 'Failed to create large path' });
  }
});

export default router; 