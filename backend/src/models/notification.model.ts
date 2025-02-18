import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['PROGRESS_UPDATE', 'ACHIEVEMENT_EARNED', 'TEST_NOTIFICATION'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  pathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Notification = mongoose.model('Notification', notificationSchema); 