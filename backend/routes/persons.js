import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { enrollPerson, listPersons } from '../controllers/personController.js';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `enroll_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// POST /api/persons → enroll a new person (name + image)
router.post('/', upload.single('image'), enrollPerson);

// GET /api/persons → list all persons (for debug/display)
router.get('/', listPersons);

export default router;
