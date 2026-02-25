import express from 'express';
import { body } from 'express-validator';
import {
    generateItineraryHandler,
    saveItinerary,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.use(protect);

router.post(
    '/generate-itinerary',
    body('destination').trim().notEmpty(),
    body('days').isInt({ min: 1, max: 30 }),
    body('budget').optional().isFloat({ min: 0 }),
    body('travelStyle').optional().isIn(['relaxed', 'moderate', 'fast']),
    validate,
    generateItineraryHandler
);

router.post(
    '/save-itinerary',
    body('destination').trim().notEmpty(),
    body('days').isInt({ min: 1, max: 30 }),
    body('title').trim().notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('budget').optional().isFloat({ min: 0 }),
    body('travelStyle').optional().isIn(['relaxed', 'moderate', 'fast']),
    validate,
    saveItinerary
);

export default router;
