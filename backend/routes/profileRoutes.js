import express from 'express';
import { getUserProfile, editUser, checkUsername, getGenders, getStates, getCities, getBankAccountTypes, verifyIfsc, updateProfilePicture, updateAbout } from '../controllers/profileController.js';
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
      // Get the base path from your database
      const request = pool.request();
      request.input('DocumentType', sql.VarChar(100), 'Profile'); 
      const result = await request.execute('dbo.EV_GetFileRepositoryPath');

      if (!result.recordset || result.recordset.length === 0) {
        return cb(new Error('Repository path not found in DB.'));
      }

      const baseUploadPath = result.recordset[0].path; // e.g., \\Eduvora-001\ProfilePictures

      // Get the UUID from the authenticated user
      const userUuid = req.user.id;

      // Combine base path with the UUID to create the subfolder path
      const finalUploadPath = path.join(baseUploadPath, userUuid);

      // Create the UUID folder (and base folder) if they don't exist
      if (!fs.existsSync(finalUploadPath)) {
        fs.mkdirSync(finalUploadPath, { recursive: true });
      }
      else {
        // If folder exists, look for any old Display_Picture files and delete them
        const existingFiles = fs.readdirSync(finalUploadPath);
        for (const file of existingFiles) {
          if (file.startsWith('Display_Picture')) {
            fs.unlinkSync(path.join(finalUploadPath, file)); // Deletes the old file
          }
        }
    }
      // Tell Multer to save it in this specific UUID folder
      cb(null, finalUploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Keep the original extension (.jpg, .jpeg, or .png)
    const extension = path.extname(file.originalname);
    
    // The file name should be Display_Picture + extension
    cb(null, `Display_Picture${extension}`);
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

router.put('/updatepicture', isLoggedIn, upload.single('profileImage'), updateProfilePicture);

router.put('/updateAbout', isLoggedIn, updateAbout);



export default router;