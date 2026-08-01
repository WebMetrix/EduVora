import express from 'express';
import { assignReferral, getReferralsList } from '../controllers/referralController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Assign a referral after user signup
// Protected by auth middleware because the user must be logged in/signed up to assign the referral to their UUID
router.post('/assign', isLoggedIn, assignReferral);

// Fetch referrals list for the data table
router.get('/list', isLoggedIn, getReferralsList);

export default router;
