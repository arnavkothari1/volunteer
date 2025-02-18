import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Define the route without the /health prefix
router.get('/health', (_req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
  
  res.json(health);
});

export default router; 