import express from 'express';
import { getMyEarnings, withdrawWallet } from '../controllers/earningsController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', isLoggedIn, getMyEarnings);
router.post('/withdraw', isLoggedIn, withdrawWallet);

export default router;
