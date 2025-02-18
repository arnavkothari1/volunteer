import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import profileRouter from './routes/profile';
import applicationRoutes from './routes/applications';

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
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 