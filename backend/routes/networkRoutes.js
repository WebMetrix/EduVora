import express from 'express';
import { getNetworkTree } from '../controllers/networkController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', isLoggedIn, getNetworkTree);

export default router;
