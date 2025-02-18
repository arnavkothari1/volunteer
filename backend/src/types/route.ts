import { Response, RequestHandler } from 'express';
import { AuthRequest } from './user';

export const createAuthHandler = (
  handler: (req: AuthRequest, res: Response) => Promise<void>
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req as AuthRequest, res);
    } catch (error) {
      next(error);
    }
  };
}; 