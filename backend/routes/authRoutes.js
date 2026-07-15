import express from 'express';
import { registerUser, loginUser, logoutUser, googleAuth } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/register', registerUser); // Generates temporary username
router.post('/login', loginUser);
router.post('/logout', isLoggedIn, logoutUser);
router.post('/google', googleAuth);



export default router;