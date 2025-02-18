import mongoose, { model } from 'mongoose';
import { Analytics } from './analytics.model';
import { Path } from './path.model';
import { Progress } from './progress.model';
import { User } from './user.model';
import { Notification } from './notification.model';
import { Assessment } from './assessment.model';
import { Achievement } from './achievement.model';
import { Comment } from './comment.model';


// Interfaces
export interface IPath extends mongoose.Document {
  title: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  category: string;
  difficulty: string;
  steps: Array<{ title: string; content: string }>;
  totalSteps: number;
}

// Ensure this is the only definition of Models
export interface Models {
  User: mongoose.Model<any>;
  Progress: mongoose.Model<any>;
  Notification: mongoose.Model<any>;
  Assessment: mongoose.Model<any>;
  Path: mongoose.Model<any>;
  Comment: mongoose.Model<any>;
}

let models: Models | null = null;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Models object to store our models
const modelsObject = {
  Analytics,
  Path,
  Progress,
  User,
  Notification,
  Assessment,
  Achievement,
  Comment
};

export const getModels = () => {
  return modelsObject;
};

// Export models directly
export {
  Analytics,
  Path,
  Progress,
  User,
  Notification,
  Assessment,
  Achievement,
  Comment
};

// Ensure the Models type is defined correctly
export type ModelsType = ReturnType<typeof getModels>;
