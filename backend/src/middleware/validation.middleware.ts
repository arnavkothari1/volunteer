import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { body, validationResult } from 'express-validator';

const pathSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10),
  topics: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      resources: Joi.array().items(
        Joi.object({
          title: Joi.string().required(),
          url: Joi.string().uri().required(),
          type: Joi.string().valid('video', 'article', 'course', 'other'),
          description: Joi.string()
        })
      )
    })
  ).min(1),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  isPublic: Joi.boolean()
});

const commentSchema = Joi.object({
  path: Joi.string().required(),
  content: Joi.string().required().min(1).max(1000),
  rating: Joi.number().min(1).max(5),
  parentComment: Joi.string()
});

const progressSchema = Joi.object({
  pathId: Joi.string().required(),
  topicId: Joi.string(),
  resourceId: Joi.string()
});

export const validatePath = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await pathSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.message
      });
      return;
    }
  }
};

export const validateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await commentSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.message
      });
    }
  }
};

export const validateProgress = [
  body('progress').isNumeric().withMessage('Progress must be a number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 