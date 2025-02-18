import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const testJwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Debug: No token provided');
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Debug: Token received:', token);
  const secret = process.env.JWT_SECRET || 'test-secret';  // Match test secret

  try {
    jwt.verify(token, secret);
    next();
  } catch (error: any) {
    console.log('Debug: JWT Error:', {
      name: error.name,
      message: error.message,
      expiredAt: error.expiredAt
    });
    
    if (error.name === 'TokenExpiredError') {
      console.log('Debug: Token expired error detected');
      res.status(401).json({ error: 'expired' });
    } else {
      console.log('Debug: Other token error detected');
      res.status(401).json({ error: 'Invalid token' });
    }
  }
}; 