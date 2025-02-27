import { Request } from 'express';
import { Role, User } from '@prisma/client';

export type UserType = User;

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export {}; 