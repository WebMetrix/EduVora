import express from 'express';
import { registerUser, loginUser, logoutUser, googleAuthUser } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', isLoggedIn, logoutUser);
router.post('/google', googleAuthUser);



export default router;