import mongoose, { Document, Schema } from 'mongoose';

export interface Category extends Document {
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String },
  color: { type: String }
}, { timestamps: true });

export const CategoryModel = mongoose.model<Category>('Category', categorySchema); 