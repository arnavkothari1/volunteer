import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import profileRouter from './routes/profile';
import applicationRoutes from './routes/application';
import protectedRoutes from './routes/protected';
import searchRoutes from './routes/search';
import internshipRoutes from './routes/internships';
import path from 'path';

const app = express();

app.use(cors({
  origin: [
    'https://volunteer-zu91e2qw-arnav-kotharis-projects.vercel.app',
    'http://localhost:3000'  // Keep this for local development
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/application', applicationRoutes);
app.use('/api', searchRoutes);
app.use('/api', internshipRoutes);
app.use('/api', protectedRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 