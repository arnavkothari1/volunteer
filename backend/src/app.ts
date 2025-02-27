import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import companyRoutes from './routes/company';
import internshipRoutes from './routes/internships';
import cookieParser from 'cookie-parser';
import applicationRoutes from './routes/application';
import uploadRouter from './routes/upload';
import profileRouter from './routes/profile';

const app = express();

// Order is important!
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🔄 ${req.method} ${req.url}`);
  next();
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRouter);
app.use('/api/company', companyRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/upload', uploadRouter);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('\nAvailable endpoints:');
  console.log('  POST http://localhost:5000/api/auth/signup');
  console.log('  POST http://localhost:5000/api/auth/login');
  console.log('  POST http://localhost:5000/api/profile');
});

export default app;
