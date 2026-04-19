import express from 'express';
import multer from 'multer';
import { handleUpload } from '../controllers/uploadController.js';

const router = express.Router();

// Memory storage keeps file buffer in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), handleUpload);

export default router;
