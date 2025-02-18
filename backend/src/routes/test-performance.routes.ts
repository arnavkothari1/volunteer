import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getModels } from '../models';

const router = Router();
const { Path, Progress } = getModels();

// Route for progress updates performance test
router.put('/progress/:pathId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { pathId } = req.params;
    const { currentStep } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId, pathId },
      { 
        currentStep,
        $addToSet: { completedSteps: currentStep - 1 }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Route for memory load test
router.post('/memory-test', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const path = await Path.create({
      title: `Memory Test Path ${Date.now()}`,
      description: 'Test Description',
      category: 'TEST',
      difficulty: 'BEGINNER',
      creator: userId,
      steps: [{ title: 'Step 1', content: 'Content 1' }]
    });
    res.status(201).json(path);
  } catch (error) {
    res.status(500).json({ error: 'Failed memory test' });
  }
});

export default router; 