import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '../models/category.model';
import { APIError } from '../middleware/error.middleware';
import { getModels } from '../models';

const { Path } = getModels();

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories || []);
  } catch (error) {
    next(error);
  }
};

export const getPathsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const paths = await Path.find({ category: categoryId });
    res.json(paths || []);
  } catch (error) {
    next(error);
  }
};

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Path.distinct('tags');
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

export const getPathsByTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tag } = req.params;
    const paths = await Path.find({ tags: tag }).select('title description difficulty category tags');
    
    if (!paths.length) {
      throw new APIError(404, 'No paths found with this tag');
    }
    
    res.json(paths);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await CategoryModel.findById(req.params.categoryId);
    if (!category) {
      throw new APIError(404, 'Category not found');
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );
    if (!category) {
      throw new APIError(404, 'Category not found');
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.categoryId);
    if (!category) {
      throw new APIError(404, 'Category not found');
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
}; 