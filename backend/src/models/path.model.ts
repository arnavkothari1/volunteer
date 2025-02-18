import mongoose, { Schema, Document } from 'mongoose';

export interface IPath extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  totalSteps: number;
  creator: mongoose.Types.ObjectId;
  averageRating?: number;
  ratings?: Rating[];
  steps: Array<{
    title: string;
    content: string;
  }>;
  collaborators: Array<{
    userId: mongoose.Types.ObjectId;
    role: string;
  }>;
  versions: Array<{
    version: string;
    notes: string;
    createdAt: Date;
  }>;
  views: number;
  calculateAverageRating(): number;
}

interface Rating {
  userId: mongoose.Types.ObjectId;
  rating: number;
  review?: string;
  createdAt: Date;
}

export const PathCategories = [
  'TEST', 
  'DEVELOPMENT', 
  'DESIGN', 
  'GENERAL',
  'PROGRAMMING',  // Added for feature tests
  'BEGINNER',
  'INTERMEDIATE', 
  'ADVANCED'
] as const;

export const PathDifficulties = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;

const stepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String
});

const pathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: PathCategories,
    required: true,
    uppercase: true
  },
  difficulty: {
    type: String,
    enum: PathDifficulties,
    required: true,
    uppercase: true
  },
  steps: [stepSchema],
  totalSteps: { type: Number, default: 0 },
  ratings: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    review: String,
    createdAt: { type: Date, default: Date.now }
  }],
  averageRating: { type: Number, default: 0 },
  collaborators: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    role: String
  }],
  versions: [{
    version: String,
    notes: String,
    createdAt: { type: Date, default: Date.now }
  }],
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Add compound index for unique title per user
pathSchema.index({ title: 1, creator: 1 }, { unique: true });

// Add a method to calculate average rating
pathSchema.methods.calculateAverageRating = function(): number {
  if (!this.ratings || this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc: number, curr: Rating) => acc + curr.rating, 0);
  return sum / this.ratings.length;
};

// Add a pre-save hook to update averageRating
pathSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    const doc = this as unknown as IPath;
    doc.averageRating = doc.calculateAverageRating();
  }
  next();
});

export const Path = mongoose.model<IPath>('Path', pathSchema);
export default pathSchema; 