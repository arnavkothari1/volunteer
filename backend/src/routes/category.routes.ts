import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { 
  getAllCategories,
  getPathsByCategory,
  getAllTags,
  getPathsByTag,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *         description:
 *           type: string
 *           description: Category description
 *         icon:
 *           type: string
 *           description: Category icon identifier
 *         color:
 *           type: string
 *           description: Category color code
 *         pathCount:
 *           type: number
 *           description: Number of paths in this category
 * 
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Tag name
 *         pathCount:
 *           type: number
 *           description: Number of paths using this tag
 * 
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 * 
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 * 
 * /api/categories/{categoryId}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 * 
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 * 
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 * 
 * /api/categories/{categoryId}/paths:
 *   get:
 *     summary: Get all paths in a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of paths in category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Path'
 *       404:
 *         description: Category not found
 * 
 * /api/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 * 
 * /api/tags/{tagName}/paths:
 *   get:
 *     summary: Get all paths with a specific tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of paths with tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Path'
 *       404:
 *         description: Tag not found
 */

router.get('/', getAllCategories);
router.post('/', authMiddleware, createCategory);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', authMiddleware, updateCategory);
router.delete('/:categoryId', authMiddleware, deleteCategory);
router.get('/:categoryId/paths', getPathsByCategory);
router.get('/tags', getAllTags);
router.get('/tags/:tag/paths', getPathsByTag);

export default router; 