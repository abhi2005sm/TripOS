import express from 'express';
import { body, param } from 'express-validator';
import {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip,
    addItineraryDay,
    addActivity,
    reorderActivities,
} from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.use(protect);

const createValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('destination.name').notEmpty().withMessage('Destination name required'),
    body('startDate').isISO8601().withMessage('Valid start date required'),
    body('endDate').isISO8601().withMessage('Valid end date required'),
];

router
    .route('/')
    .get(getTrips)
    .post(createValidation, validate, createTrip);

router
    .route('/:id')
    .get(param('id').isMongoId(), validate, getTrip)
    .put(param('id').isMongoId(), validate, updateTrip)
    .delete(param('id').isMongoId(), validate, deleteTrip);

router.post(
    '/:id/itinerary',
    param('id').isMongoId(),
    body('dayNumber').optional().isInt({ min: 1 }),
    validate,
    addItineraryDay
);

router.post(
    '/:id/itinerary/:dayIndex/activities',
    param('id').isMongoId(),
    param('dayIndex').isInt({ min: 0 }),
    body('title').trim().notEmpty(),
    validate,
    addActivity
);

router.put(
    '/:id/itinerary/:dayIndex/activities/reorder',
    param('id').isMongoId(),
    param('dayIndex').isInt({ min: 0 }),
    body('activityIds').isArray(),
    validate,
    reorderActivities
);

export default router;
