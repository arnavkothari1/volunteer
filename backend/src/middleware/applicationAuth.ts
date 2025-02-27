import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const applicationAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }

      try {
        const user = await prisma.user.findUnique({
          where: { id: (decoded as { id: string }).id }
        });

        if (!user) {
          res.status(401).json({ message: 'User not found' });
          return;
        }

        // @ts-ignore
        req.user = user;
        next();
      } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Invalid token' });
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
}; 