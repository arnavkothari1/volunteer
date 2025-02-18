/**
 * @swagger
 * components:
 *   schemas:
 *     Path:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - difficulty
 *         - category
 *         - totalSteps
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         category:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         totalSteps:
 *           type: number
 *       example:
 *         title: JavaScript Basics
 *         description: Learn JavaScript fundamentals
 *         difficulty: beginner
 *         category: Programming
 *         tags: [javascript, web-development]
 *         totalSteps: 5
 * 
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         color:
 *           type: string
 *       example:
 *         name: Programming
 *         description: Programming related paths
 *         icon: code
 *         color: "#007bff"
 * 
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         pathCount:
 *           type: number
 *       example:
 *         name: javascript
 *         pathCount: 3
 */

// ... endpoint documentation ... 