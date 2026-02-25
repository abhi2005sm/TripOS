import express from 'express';
import multer from 'multer';
import {
    getProfile,
    updateProfile,
    uploadAvatar,
    updatePreferences,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
});

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', body('name').optional().trim(), validate, updateProfile);
router.post('/avatar', upload.single('avatar'), uploadAvatar);
router.put(
    '/preferences',
    body('currency').optional().isLength({ min: 3, max: 3 }),
    body('language').optional().isLength({ max: 10 }),
    body('pace').optional().isIn(['relaxed', 'moderate', 'fast']),
    body('budgetMode').optional().isIn(['budget', 'standard', 'luxury']),
    validate,
    updatePreferences
);

export default router;
