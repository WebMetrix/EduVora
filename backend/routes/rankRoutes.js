import express from 'express';
import { 
    getUserRanksOverview, 
    getFilteredAchievements, 
    getAchievementHistory, 
    getAchievementCategories 
} from '../controllers/rankController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get Full Overview: Current Rank, Next Rank, Master Ranks, Carousel Achievements, Recent Feed
router.get('/', isLoggedIn, getUserRanksOverview);

// Get Filtered Achievements for View All Modal
router.get('/achievements', isLoggedIn, getFilteredAchievements);

// Get Chronological History Audit Timeline
router.get('/history', isLoggedIn, getAchievementHistory);

// Get Active Achievement Categories
router.get('/categories', isLoggedIn, getAchievementCategories);

export default router;
