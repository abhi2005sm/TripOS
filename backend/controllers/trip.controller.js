import asyncHandler from 'express-async-handler';
import Trip from '../models/Trip.js';
import { generateItinerary } from '../services/openai.service.js';
import { getPlaceDetails } from '../services/maps.service.js';

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
export const createTrip = asyncHandler(async (req, res) => {
    const { title, destination, startDate, endDate, budget } = req.body;

    // Enhance destination with coordinates if not provided
    let locationData = destination;
    if (!destination.lat || !destination.lng) {
        locationData = await getPlaceDetails(destination.name);
    }

    const trip = await Trip.create({
        user: req.user._id,
        title,
        destination: locationData,
        startDate,
        endDate,
        budget,
    });

    res.status(201).json(trip);
});

// @desc    Get all user trips with pagination
// @route   GET /api/trips
// @access  Private
export const getTrips = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Trip.countDocuments({ user: req.user._id, isDeleted: false });
    const trips = await Trip.find({ user: req.user._id, isDeleted: false })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ trips, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        res.json(trip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        trip.title = req.body.title || trip.title;
        trip.status = req.body.status || trip.status;
        trip.budget = req.body.budget || trip.budget;
        trip.itinerary = req.body.itinerary || trip.itinerary;

        const updatedTrip = await trip.save();
        res.json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    Soft delete trip
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        trip.isDeleted = true;
        await trip.save();
        res.json({ message: 'Trip removed' });
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    Add day to itinerary
// @route   POST /api/trips/:id/itinerary
// @access  Private
export const addTripDay = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        const dayNumber = trip.itinerary.length + 1;
        trip.itinerary.push({ dayNumber, activities: [] });
        const updatedTrip = await trip.save();
        res.status(201).json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    Add activity to a day
// @route   POST /api/trips/:id/itinerary/:dayId/activity
// @access  Private
export const addTripActivity = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        const day = trip.itinerary.id(req.params.dayId);
        if (!day) {
            res.status(404);
            throw new Error('Day not found');
        }

        const { title, location, startTime, endTime, description, type } = req.body;
        day.activities.push({
            title,
            location,
            startTime,
            endTime,
            description,
            type,
            order: day.activities.length,
        });

        const updatedTrip = await trip.save();
        res.status(201).json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    AI Generate Trip Itinerary
// @route   POST /api/trips/generate
// @access  Private
export const aiGenerateTrip = asyncHandler(async (req, res) => {
    const { destination, days, budget, style } = req.body;

    const generatedPlan = await generateItinerary({
        destination,
        days,
        budget,
        style,
    });

    res.json(generatedPlan);
});
