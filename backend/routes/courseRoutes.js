import express from 'express';
import {
    getUserCourses,
    getEBookReaderDetails,
    saveUserProgress,
    getChapterAudio
} from '../controllers/courseController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get Full Courses Overview: Cumulative Unlocked Packages, EBooks, and Curriculum Breakdown
router.get('/', isLoggedIn, getUserCourses);

// Get EBook Reader Canvas & Table of Contents Details
router.get('/reader/:ebookId', isLoggedIn, getEBookReaderDetails);

// Save / Sync Reading & Audio Progress
router.post('/progress', isLoggedIn, saveUserProgress);

// Quick Audio Play Lookup by Chapter or EBook
router.get('/audio', isLoggedIn, getChapterAudio);

export default router;
