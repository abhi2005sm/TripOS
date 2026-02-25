import asyncHandler from 'express-async-handler';
import { generateItinerary } from '../services/openaiService.js';
import Trip from '../models/Trip.js';

/**
 * @desc    Generate itinerary with AI
 * @route   POST /api/ai/generate-itinerary
 * @access  Private
 */
export const generateItineraryHandler = asyncHandler(async (req, res) => {
    const { destination, days, budget, travelStyle } = req.body;

    if (!destination || !days) {
        res.status(400);
        throw new Error('Destination and days are required');
    }

    const itinerary = await generateItinerary({
        destination,
        days: parseInt(days, 10),
        budget: budget || 0,
        travelStyle: travelStyle || 'moderate',
        currency: req.user?.preferences?.currency || 'INR',
    });

    res.json({
        success: true,
        data: {
            itinerary,
        },
    });
});

/**
 * @desc    Generate and save itinerary as trip
 * @route   POST /api/ai/save-itinerary
 * @access  Private
 */
export const saveItinerary = asyncHandler(async (req, res) => {
    const {
        destination,
        days,
        budget,
        travelStyle,
        title,
        startDate,
        endDate,
    } = req.body;

    if (!destination || !days || !title || !startDate || !endDate) {
        res.status(400);
        throw new Error(
            'Destination, days, title, startDate, and endDate are required'
        );
    }

    const itinerary = await generateItinerary({
        destination,
        days: parseInt(days, 10),
        budget: budget || 0,
        travelStyle: travelStyle || 'moderate',
        currency: req.user?.preferences?.currency || 'INR',
    });

    const trip = await Trip.create({
        user: req.user._id,
        title,
        destination: { name: destination },
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: {
            total: budget || 0,
            currency: req.user?.preferences?.currency || 'INR',
        },
        itinerary,
        travelStyle,
    });

    res.status(201).json({
        success: true,
        data: trip,
    });
});
