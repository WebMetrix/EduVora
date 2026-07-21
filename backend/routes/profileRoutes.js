import express from 'express';
import { getUserProfile, editUser, checkUsername, getGenders, getStates, getCities, getBankAccountTypes, verifyIfsc } from '../controllers/profileController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pool, { sql } from '../config/db.js';

const router = express.Router();

router.post('/checkusername', checkUsername);
router.get('/dropdowns/genders', getGenders);
router.get('/dropdowns/states', getStates);
router.get('/dropdowns/cities', getCities);
router.get('/dropdowns/banktypes', getBankAccountTypes);

// IFSC Verification Route 
router.get('/verifyifsc/:ifscCode', verifyIfsc);

// Protected Routes
router.get('/', isLoggedIn, getUserProfile);

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      // 1. Get the path from your database
      const request = pool.request();
      request.input('DocumentType', sql.VarChar(100), 'Profile'); 
      const result = await request.execute('dbo.EV_GetFileRepositoryPath');

      if (!result.recordset || result.recordset.length === 0) {
        return cb(new Error('Repository path not found in DB.'));
      }

      const uploadPath = result.recordset[0].path; // e.g., \\Eduvora-001\ProfilePictures

      // 2. Create folder if it doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // 3. Tell Multer to save it here
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Make file name unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only PNG and JPG are allowed!'), false);
        }
    }
});

router.put('/edit', isLoggedIn, upload.single('profileImage'), editUser);
// router.put('/edit', isLoggedIn, editUser);



export default router;