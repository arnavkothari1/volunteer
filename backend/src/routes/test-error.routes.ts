import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

const router = Router();

// Test route for rate limiting (no auth required)
const testRateLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 2, // stricter limit to ensure rate limiting happens
  skipFailedRequests: false,
  statusCode: 429,
  message: { error: 'Too many requests' }
});

// Remove auth requirement and make rate limit stricter
router.post('/auth/rate-limit', testRateLimiter, (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' });
});

// Test route for brute force prevention (no auth required)
const bruteForceLimit = rateLimit({
  windowMs: 1000, // 1 second
  max: 2, // stricter limit
  skipFailedRequests: false,
  statusCode: 429,
  message: { error: 'Too many attempts' }
});

// Remove auth requirement
router.post('/auth/brute-force', bruteForceLimit, (_req: Request, res: Response) => {
  res.status(401).json({ error: 'Invalid credentials' });
});

export default router; 