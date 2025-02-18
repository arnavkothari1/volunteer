/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         password: password123
 * 
 *     Path:
 *       example:
 *         title: Learn JavaScript
 *         description: A comprehensive guide to JavaScript
 *         difficulty: intermediate
 *         category: Programming
 *         totalSteps: 10
 *         tags: [javascript, web-development]
 * 
 *     Progress:
 *       example:
 *         currentStep: 3
 *         status: in_progress
 *         completedSteps: [1, 2]
 *         lastAccessed: "2024-03-20T10:00:00Z"
 * 
 *     Comment:
 *       example:
 *         content: Great learning path!
 *         rating: 5
 *         createdAt: "2024-03-20T10:00:00Z"
 * 
 *     Category:
 *       example:
 *         name: Programming
 *         description: Programming related paths
 *         icon: code
 *         color: #007bff
 * 
 *     Error:
 *       example:
 *         message: Invalid input
 *         status: 400
 */ 

import mongoose from 'mongoose';

// Path Schema
export const pathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'TEST']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
  },
  steps: [{
    title: { type: String, required: true },
    content: { type: String, required: true }
  }],
  totalSteps: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Progress Schema
export const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  pathId: { type: mongoose.Schema.Types.ObjectId, required: true },
  currentStep: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
});

// Assessment Schema
export const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  pathId: { type: mongoose.Schema.Types.ObjectId, required: true },
  score: Number,
  completedAt: Date
});

// Achievement Schema
export const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: String,
  unlockedAt: { type: Date, default: Date.now }
});

// Comment Schema
export const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  pathId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Notification Schema
export const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});