import { Types } from 'mongoose';
import { User } from './user';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {}; 