import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB connected');
    
    // Create indexes
    await createIndexes();
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // This will terminate the process if there's an error
  }
};

const createIndexes = async () => {
  try {
    // Create email index for User model
    await mongoose.model('User').collection.createIndex(
      { email: 1 }, 
      { unique: true }
    );
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

export const disconnectDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

export default connectDB; 