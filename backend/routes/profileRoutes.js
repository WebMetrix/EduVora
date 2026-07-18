import express from 'express';
import { getUserProfile, editUser, checkUsername, getGenders, getStates, getCities, getBankAccountTypes, verifyIfsc } from '../controllers/profileController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/checkusername', checkUsername);
router.get('/dropdowns/genders', getGenders);
router.get('/dropdowns/states', getStates);
router.get('/dropdowns/cities', getCities);
router.get('/dropdowns/bank-types', getBankAccountTypes);

// IFSC Verification Route 
router.get('/verify-ifsc/:ifscCode', verifyIfsc);

// Protected Routes
router.get('/', isLoggedIn, getUserProfile);
router.put('/edit', isLoggedIn, editUser);

export default router;