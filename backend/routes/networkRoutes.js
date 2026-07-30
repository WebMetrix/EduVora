import express from 'express';
import { getNetworkTree } from '../controllers/networkController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Network
 *   description: Network and genealogy tree management
 */

/**
 * @swagger
 * /network:
 *   get:
 *     summary: Retrieve the user's genealogy network tree
 *     tags: [Network]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched the network tree
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 children:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized. User must be logged in.
 *       500:
 *         description: Internal server error
 */
router.get('/', isLoggedIn, getNetworkTree);

export default router;
