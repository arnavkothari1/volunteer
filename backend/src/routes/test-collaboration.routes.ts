import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getModels } from '../models';
import mongoose from 'mongoose';

const router = Router();
const { Path } = getModels();

// Test route for path sharing
router.post('/share/:pathId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const path = await Path.findById(req.params.pathId);
    
    if (!path) {
      res.status(404).json({ error: 'Path not found' });
      return;
    }

    // Check if user is creator
    if (path.creator.toString() !== userId) {
      res.status(403).json({ error: 'Not authorized to share this path' });
      return;
    }

    // Add collaborator with required fields
    const collaboratorId = new mongoose.Types.ObjectId(req.body.userId);
    path.collaborators = path.collaborators || [];
    path.collaborators.push({ userId: collaboratorId, role: 'editor' });
    await path.save();
    
    res.status(200).json(path);
  } catch (error) {
    console.error('Share path error:', error);
    res.status(500).json({ error: 'Failed to share path' });
  }
});

// Test route for path editing
router.put('/:pathId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const path = await Path.findById(req.params.pathId);
    
    if (!path) {
      res.status(404).json({ error: 'Path not found' });
      return;
    }

    // Check authorization
    const isCreator = path.creator.toString() === userId;
    const isCollaborator = path.collaborators?.some(collab => 
      collab.userId.toString() === userId
    );

    if (!isCreator && !isCollaborator) {
      res.status(403).json({ error: 'Not authorized to edit this path' });
      return;
    }

    // Update path
    Object.assign(path, req.body);
    await path.save();
    
    res.status(200).json(path);
  } catch (error) {
    console.error('Edit path error:', error);
    res.status(500).json({ error: 'Failed to edit path' });
  }
});

export default router; 