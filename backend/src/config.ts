export const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: JWT_SECRET,
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/pathbuilder'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  }
}; 