import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { MongoUser } from '../types/user';
import mongoose from 'mongoose';
import { AuthRequest } from '../types/user';
import { Types } from 'mongoose';
import { wrapAuthMiddleware } from '../types/middleware';

// Define the JWT payload type
interface JWTPayload extends MongoUser {}

// Define the User type for the request
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authMiddleware = wrapAuthMiddleware(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload & {
        userId: string;
        email: string;
      };

      req.user = {
        id: decoded.userId,
        email: decoded.email
      };
      
      next();
    } catch (jwtError: unknown) {
      console.error('JWT Verification Error:', jwtError);
      res.status(401).json({ message: 'Invalid token', error: jwtError instanceof Error ? jwtError.message : 'Unknown error' });
      return;
    }
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
});

// Example middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is not valid' });
    }
    req.user = decoded as MongoUser;
    next();
  });
};
