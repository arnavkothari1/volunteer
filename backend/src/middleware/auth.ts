import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserType } from '../types/express'; // Import the UserType
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      
      if (!decoded.id) {
        res.status(401).json({ message: 'Invalid token format' });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id }
      });

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      req.user = user as UserType;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Authentication failed' });
    return;
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    next();
  };
};