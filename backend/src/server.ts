import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { config } from './config';
import { limiter, authLimiter } from './middleware/rateLimit.middleware';
import companyRoutes from './routes/company';
import internshipRoutes from './routes/internships';
import applicationRoutes from './routes/application';
import profileRoutes from './routes/profile';
import cookieParser from 'cookie-parser';
import searchRoutes from './routes/search';
import protectedRoutes from './routes/protected';

dotenv.config();

export const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Apply rate limiting
app.use(limiter); // Global rate limiting
app.use('/api/auth', authLimiter); // Stricter limits for auth routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api', internshipRoutes);
app.use('/api', applicationRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', searchRoutes);
app.use('/api', protectedRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware (should be last)
app.use(errorHandler);

export const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });
};

// Only call startServer if this file is being run directly
if (require.main === module) {
  startServer();
}

export default app; 