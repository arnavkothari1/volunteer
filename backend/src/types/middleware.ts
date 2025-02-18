import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './user';

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type AuthRequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export const wrapAuthMiddleware = (middleware: AuthRequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await middleware(req as AuthRequest, res, next);
    } catch (error) {
      next(error);
    }
  };
};
