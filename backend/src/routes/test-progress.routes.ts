import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getModels } from '../models';

const router = Router();
const { Progress } = getModels();

// Test route for progress updates
router.put('/:pathId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { pathId } = req.params;
    const { currentStep, completedSteps, timeSpent } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId, pathId },
      {
        currentStep,
        completedSteps,
        timeSpent
      },
      { new: true, upsert: true }
    );

    res.status(200).json(progress);
  } catch (error) {
    console.error('Test progress update error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Validation routes
router.put('/validate/current-step/:pathId', authMiddleware, (req: Request, res: Response): void => {
  if (req.body.currentStep < 0) {
    res.status(400).json({ error: 'Current step must be non-negative' });
    return;
  }
  res.status(200).json({ message: 'Valid current step' });
});

router.put('/validate/completed-steps/:pathId', authMiddleware, (req: Request, res: Response): void => {
  if (!Array.isArray(req.body.completedSteps) || req.body.completedSteps.some((step: number) => step < 0)) {
    res.status(400).json({ error: 'Completed steps must be valid' });
    return;
  }
  res.status(200).json({ message: 'Valid completed steps' });
});

router.put('/validate/time-spent/:pathId', authMiddleware, (req: Request, res: Response): void => {
  if (req.body.timeSpent < 0) {
    res.status(400).json({ error: 'Time spent must be non-negative' });
    return;
  }
  res.status(200).json({ message: 'Valid time spent' });
});

router.put('/validate/notes/:pathId', authMiddleware, (req: Request, res: Response): void => {
  if (req.body.notes && req.body.notes.length > 1000) {
    res.status(400).json({ error: 'Notes too long' });
    return;
  }
  res.status(200).json({ message: 'Valid notes' });
});

// Add these new routes for specific test scenarios
router.put('/completion/:pathId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { pathId } = req.params;
    const { currentStep, totalSteps } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId, pathId },
      {
        currentStep,
        isCompleted: currentStep >= totalSteps - 1,
        $addToSet: { completedSteps: currentStep }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update completion status' });
  }
});

router.put('/time-spent/:pathId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { pathId } = req.params;
    const { timeSpent } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId, pathId },
      {
        $inc: { timeSpent: timeSpent }  // Increment existing time spent
      },
      { new: true, upsert: true }
    );

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update time spent' });
  }
});

// Add this new route for testing invalid progress updates
router.put('/validate-progress/:pathId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentStep } = req.body;
    
    // Validate currentStep
    if (currentStep < 0) {
      res.status(400).json({ error: 'Invalid step value: must be non-negative' });
      return;
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: (req as any).user.userId, pathId: req.params.pathId },
      { currentStep },
      { new: true }
    );

    res.status(200).json(progress);
  } catch (error) {
    res.status(400).json({ error: 'Invalid progress update' });
  }
});

export default router; 