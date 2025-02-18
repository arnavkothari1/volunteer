import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import categoryRoutes from './routes/category.routes';
import tagRoutes from './routes/tag.routes';
import { config } from './config';
import { limiter, authLimiter } from './middleware/rateLimit.middleware';
import companyRoutes from './routes/company';
import internshipRoutes from './routes/internship';
import applicationRoutes from './routes/applications';
import profileRoutes from './routes/profile';
import cookieParser from 'cookie-parser';

dotenv.config();

export const app = express();

// CORS configuration
const corsOptions = {
  origin: config.clientUrl || 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Apply rate limiting
app.use(limiter); // Global rate limiting
app.use('/api/auth', authLimiter); // Stricter limits for auth routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/profile', profileRoutes);

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