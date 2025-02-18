export const config = {
  development: {
    mongoUri: 'mongodb://127.0.0.1:27017/pathbuilder',
    port: 3000,
    jwtSecret: 'dev_secret'
  },
  staging: {
    mongoUri: process.env.STAGING_MONGODB_URI,
    port: process.env.PORT || 3000,
    jwtSecret: process.env.STAGING_JWT_SECRET
  },
  production: {
    mongoUri: process.env.PROD_MONGODB_URI,
    port: process.env.PORT || 3000,
    jwtSecret: process.env.PROD_JWT_SECRET
  }
};
