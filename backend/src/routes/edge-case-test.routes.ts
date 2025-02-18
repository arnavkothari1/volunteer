import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getModels } from '../models';
import rateLimit from 'express-rate-limit';

const router = Router();
const { Path } = getModels();

// Rate limiting test route
const testLimiter = rateLimit({
  windowMs: 100, // Very short window for testing
  max: 1, // Only allow 1 request
  message: { error: 'Too many requests' }
});

router.get('/rate-limit-test', authMiddleware, testLimiter, (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Success' });
});

// Large dataset test route
router.post('/edge-case-path', authMiddleware, async (req: Request, res: Response): Promise<void> => {
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

// Empty array test route
router.post('/empty-array-test', authMiddleware, (req: Request, res: Response): void => {
  if (!req.body.steps || req.body.steps.length === 0) {
    res.status(400).json({ error: 'steps array cannot be empty' });
    return;
  }
  res.status(200).json({ message: 'Valid steps' });
});

export default router; 