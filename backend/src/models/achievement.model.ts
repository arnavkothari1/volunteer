import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['PATH_COMPLETE', 'STREAK', 'FIRST_PATH', 'RATING_MILESTONE'],
    required: true
  },
  pathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path'
  },
  description: String,
  earnedAt: {
    type: Date,
    default: Date.now
  }
});

export const Achievement = mongoose.model('Achievement', achievementSchema);
