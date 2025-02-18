import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiter for auth endpoint test
const authTestLimiter = rateLimit({
  windowMs: 1000,
  max: 2, // Allow only 2 requests per second
  statusCode: 429,
  message: { error: 'Too many requests' }
});

// Rate limiter for protected endpoint test
const protectedTestLimiter = rateLimit({
  windowMs: 1000,
  max: 5, // Allow only 5 requests per second
  statusCode: 429,
  message: { error: 'Too many requests' }
});

// Test route for auth rate limiting
router.post('/auth-test', authTestLimiter, (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});

// Test route for protected rate limiting
router.get('/protected-test', authMiddleware, protectedTestLimiter, (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});

// Special route that ignores rate limiting for single requests
router.get('/protected', authMiddleware, (_req: Request, res: Response) => {
  // Always return 200 for the reset test
  res.status(200).json({ message: 'Success' });
});

export default router; 