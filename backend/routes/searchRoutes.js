import express from 'express';
import { query } from 'express-validator';
import { flightSearch, hotelSearch } from '../controllers/searchController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.use(protect);

router.get(
    '/flights',
    query('originLocationCode').notEmpty(),
    query('destinationLocationCode').notEmpty(),
    query('departureDate').notEmpty(),
    query('returnDate').optional(),
    query('adults').optional().isInt({ min: 1 }),
    validate,
    flightSearch
);

router.get(
    '/hotels',
    query('cityCode').notEmpty(),
    query('checkInDate').notEmpty(),
    query('checkOutDate').notEmpty(),
    query('adults').optional().isInt({ min: 1 }),
    validate,
    hotelSearch
);

export default router;
