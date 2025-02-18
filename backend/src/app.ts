import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import companyRouter from './routes/company';
import internshipRoutes from './routes/internship';
import cookieParser from 'cookie-parser';
import applicationRoutes from './routes/applications';

const app = express();

// Order is important!
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🔄 ${req.method} ${req.url}`);
  next();
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/company', companyRouter);
app.use('/api/internships', internshipRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('\nAvailable endpoints:');
  console.log('  POST http://localhost:5000/api/auth/signup');
  console.log('  POST http://localhost:5000/api/auth/login');
  console.log('  POST http://localhost:5000/api/profile');
});

export default app;
