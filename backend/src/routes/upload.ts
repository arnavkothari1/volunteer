import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AsyncRequestHandler } from '../types/express';

// Define custom interface for Request with file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const router = Router();

// Ensure upload directories exist
const aadharDir = './uploads/aadhar';
const marksheetDir = './uploads/marksheet';
if (!fs.existsSync(aadharDir)) fs.mkdirSync(aadharDir, { recursive: true });
if (!fs.existsSync(marksheetDir)) fs.mkdirSync(marksheetDir, { recursive: true });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Choose directory based on file type
    const uploadDir = file.fieldname === 'aadhar' ? aadharDir : marksheetDir;
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg, .jpeg and .pdf format allowed!'));
  }
});

// Handle aadhar upload
router.post('/aadhar', authenticate, upload.single('aadhar'), (async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    res.json({ 
      url: `/uploads/aadhar/${req.file.filename}`
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}) as AsyncRequestHandler);

// Handle marksheet upload
router.post('/marksheet', authenticate, upload.single('marksheet'), (async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    res.json({ 
      url: `/uploads/marksheet/${req.file.filename}`
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}) as AsyncRequestHandler);

export default router; 