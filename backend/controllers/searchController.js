import asyncHandler from 'express-async-handler';
import { searchFlights, searchHotels } from '../services/amadeusService.js';

/**
 * @desc    Search flights
 * @route   GET /api/search/flights
 * @access  Private
 */
export const flightSearch = asyncHandler(async (req, res) => {
    const {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
    } = req.query;

    if (!originLocationCode || !destinationLocationCode || !departureDate) {
        res.status(400);
        throw new Error(
            'originLocationCode, destinationLocationCode, and departureDate are required'
        );
    }

    const data = await searchFlights({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate: returnDate || null,
        adults: parseInt(adults, 10) || 1,
    });

    res.json({
        success: true,
        data,
    });
});

/**
 * @desc    Search hotels
 * @route   GET /api/search/hotels
 * @access  Private
 */
export const hotelSearch = asyncHandler(async (req, res) => {
    const { cityCode, checkInDate, checkOutDate, adults } = req.query;

    if (!cityCode || !checkInDate || !checkOutDate) {
        res.status(400);
        throw new Error(
            'cityCode, checkInDate, and checkOutDate are required'
        );
    }

    const data = await searchHotels({
        cityCode,
        checkInDate,
        checkOutDate,
        adults: parseInt(adults, 10) || 1,
    });

    res.json({
        success: true,
        data,
    });
});
