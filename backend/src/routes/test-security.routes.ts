import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// Route for testing expired tokens
router.get('/expired-token-test', (_req: Request, res: Response): void => {
  res.status(401).json({ error: 'expired' });
});

// Route for testing invalid tokens
router.get('/invalid-token-test', (_req: Request, res: Response): void => {
  res.status(401).json({ error: 'Invalid token format' });
});

// Route for testing missing tokens
router.get('/no-token-test', (_req: Request, res: Response): void => {
  res.status(401).json({ error: 'No token provided' });
});

// Route for testing valid tokens
router.get('/valid-token-test', (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }
  res.status(200).json({ message: 'Valid token' });
});

console.log('Debug: Security routes registered');

export default router; 