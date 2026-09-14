import express from 'express';
import { getMyEarnings } from '../controllers/earningsController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', isLoggedIn, getMyEarnings);

export default router;
