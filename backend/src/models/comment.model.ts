import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  pathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

export const Comment = mongoose.model('Comment', commentSchema);
export const CommentModel = Comment;
export type IComment = mongoose.InferSchemaType<typeof commentSchema>;