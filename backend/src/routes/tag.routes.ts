import express from 'express';
import {
  getAllTags,
  getPathsByTag,
  createTag,
  deleteTag
} from '../controllers/tag.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllTags);
router.post('/', authMiddleware, createTag);
router.get('/:tagName/paths', getPathsByTag);
router.delete('/:tagName', authMiddleware, deleteTag);

export default router; 