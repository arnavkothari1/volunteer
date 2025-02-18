import { Request, Response, NextFunction } from 'express';

// Custom error class for API errors
export class APIError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.name = 'APIError';
  }
}

// Global error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof APIError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON format' });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
    return;
  }


  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new APIError(404, 'Not Found'));
}; 