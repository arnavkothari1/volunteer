import { MongoUser } from '../user';

declare global {
  namespace Express {
    interface Request {
      user?: MongoUser;
    }
  }
} 