import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'test' ? 1000 : 100, // Higher limit for tests
  message: { error: 'Too many requests' },
  statusCode: 429,
  skip: (req) => process.env.NODE_ENV === 'test' // Skip rate limiting in test environment
});

// Export both names for backward compatibility
export const limiter = rateLimiter;
export const authLimiter = rateLimiter;