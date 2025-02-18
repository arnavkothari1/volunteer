import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  pathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
    required: true
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }],
  passingScore: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export const Assessment = mongoose.model('Assessment', assessmentSchema);
