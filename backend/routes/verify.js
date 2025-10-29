import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyFace } from '../controllers/verifyController.js';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `verify_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// POST /api/verify → verify a new image against stored encodings
router.post('/', upload.single('image'), verifyFace);

export default router;
