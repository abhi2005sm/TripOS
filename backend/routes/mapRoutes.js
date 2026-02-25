import express from 'express';
import { body, param, query } from 'express-validator';
import {
    addLocation,
    reverseGeocodeHandler,
    getPlaceDetailsHandler,
    getTripMapData,
} from '../controllers/mapController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.use(protect);

router.post(
    '/locations',
    body('name').trim().notEmpty(),
    body('lat').isFloat(),
    body('lng').isFloat(),
    body('address').optional(),
    body('placeId').optional(),
    body('trip').optional().isMongoId(),
    validate,
    addLocation
);

router.get(
    '/reverse-geocode',
    query('lat').isFloat(),
    query('lng').isFloat(),
    validate,
    reverseGeocodeHandler
);

router.get(
    '/place/:placeId',
    param('placeId').notEmpty(),
    validate,
    getPlaceDetailsHandler
);

router.get(
    '/trip/:tripId',
    param('tripId').isMongoId(),
    validate,
    getTripMapData
);

export default router;
