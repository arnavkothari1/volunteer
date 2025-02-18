import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  pathId: mongoose.Types.ObjectId;
  currentStep: number;
  completedSteps: number[];
  startedAt: Date;
  lastAccessed: Date;
  isCompleted: boolean;
  timeSpent: number; // in minutes
  notes?: string[];
}

const progressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pathId: {
    type: Schema.Types.ObjectId,
    ref: 'Path',
    required: true
  },
  currentStep: {
    type: Number,
    default: 0,
    min: 0
  },
  completedSteps: [{
    type: Number,
    min: 0
  }],
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  timeSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: [{
    type: String,
    maxlength: 500
  }]
}, {
  timestamps: true
});

// Ensure unique user-path combination
progressSchema.index({ userId: 1, pathId: 1 }, { unique: true });

export const Progress = mongoose.model<IProgress>('Progress', progressSchema);
export type ProgressModel = typeof Progress; 