import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { isLoggedIn } from '../middlewares/authMiddleware.js';
import pool, { sql } from '../config/db.js';
import { getKycDetails, submitKyc } from '../controllers/kycController.js';

const router = express.Router();

// --- MULTER CONFIGURATION FOR KYC ---
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      // Get the base path from your database for KYC documents
      const request = pool.request();
      request.input('DocumentType', sql.VarChar(100), 'KYC');
      const result = await request.execute('dbo.EV_GetFileRepositoryPath');

      if (!result.recordset || result.recordset.length === 0) {
        return cb(new Error('Repository path not found in DB'));
      }

      const baseUploadPath = result.recordset[0].path; 

      // Get the UUID from the authenticated user
      const userUuid = req.user.id;

      // Combine base path with the UUID to create the subfolder path
      const finalUploadPath = path.join(baseUploadPath, userUuid);

      // Create the UUID folder (and base folder) if they don't exist
      if (!fs.existsSync(finalUploadPath)) {
        fs.mkdirSync(finalUploadPath, { recursive: true });
      } else {
        // If folder exists, look for any old files with the exact same fieldname and delete them
        const existingFiles = fs.readdirSync(finalUploadPath);
        for (const existingFile of existingFiles) {
          if (existingFile.startsWith(file.fieldname)) {
            fs.unlinkSync(path.join(finalUploadPath, existingFile));
          }
        }
      }
      
      cb(null, finalUploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Keep the original extension (.jpg, .jpeg, or .png)
    const extension = path.extname(file.originalname);

    // Name the file based on the fieldname (e.g., IdentityProofFrontPath.jpg)
    cb(null, `${file.fieldname}${extension}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPG, and PDF are allowed!'), false);
    }
  }
});

// Protected Routes
router.get('/', isLoggedIn, getKycDetails);

router.post(
  '/submit', 
  isLoggedIn, 
  upload.fields([
    { name: 'IdentityProofFrontPath', maxCount: 1 },
    { name: 'IdentityProofBackPath', maxCount: 1 },
    { name: 'PanCardPath', maxCount: 1 }
  ]), 
  submitKyc
);

export default router;
