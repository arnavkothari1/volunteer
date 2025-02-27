import { Request } from 'express';
import { Session } from 'express-session';

declare module 'express-session' {
  interface Session {
    userId: string;
  }
}

interface UserType {
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

export type { UserType }; 