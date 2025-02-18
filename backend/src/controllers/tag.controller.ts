import { Request, Response, NextFunction } from 'express';
import { getModels } from '../models';
import { APIError } from '../middleware/error.middleware';

const { Path } = getModels();

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Path.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          pathCount: { $sum: 1 }
        }
      },
      {
        $project: {
          name: '$_id',
          pathCount: 1,
          _id: 0
        }
      }
    ]);

    res.json(tags || []);
  } catch (error) {
    next(error);
  }
};

export const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    res.status(201).json({ name });
  } catch (error) {
    next(error);
  }
};

export const getPathsByTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tagName } = req.params;
    const paths = await Path.find({ tags: tagName });
    
    res.json(paths || []);
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tagName } = req.params;
    await Path.updateMany(
      { tags: tagName },
      { $pull: { tags: tagName } }
    );
    res.json({ message: 'Tag removed successfully' });
  } catch (error) {
    next(error);
  }
}; 