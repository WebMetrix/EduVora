import express from 'express';
import { getRecentActivities } from '../controllers/dashboardController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/activities', isLoggedIn, getRecentActivities);

export default router;
