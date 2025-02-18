import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface User {
  _id: string;  // MongoDB ID
  email: string;
  name: string;
}

// Add this to ensure type safety with MongoDB
export interface MongoUser {
  id: string;
  email: string;
}

// For JWT payload
export interface JWTPayload {
  _id: string;  // Ensure this matches your JWT structure
  email: string;
}

// Add this to augment Express Request
declare global {
  namespace Express {
    interface Request {
      user?: MongoUser;
    }
  }
}

export interface Notification {
  _id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Path {
  _id: string;
  title: string;
  description?: string;
  steps: Array<{
    title: string;
    content: string;
  }>;
}

export interface Progress {
  _id: string;
  userId: string;
  pathId: string;
  currentStep: number;
  completed: boolean;
}

export interface AuthRequest extends Request {
  user?: MongoUser;
} 