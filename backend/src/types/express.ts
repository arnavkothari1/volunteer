import { Request, Response, NextFunction } from 'express';

export interface UserType {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export interface TypedRequest<T = any> extends Request {
  body: T;
  user?: {
    id: string;
    email: string;
    role: string;
  };
} 