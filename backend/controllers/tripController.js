import asyncHandler from 'express-async-handler';
import Trip from '../models/Trip.js';

/**
 * @desc    Create trip
 * @route   POST /api/trips
 * @access  Private
 */
export const createTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.create({
        ...req.body,
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        data: trip,
    });
});

/**
 * @desc    Get all trips (paginated)
 * @route   GET /api/trips
 * @access  Private
 */
export const getTrips = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const total = await Trip.countDocuments({ user: req.user._id });
    const trips = await Trip.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    res.json({
        success: true,
        data: trips,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    });
});

/**
 * @desc    Get single trip
 * @route   GET /api/trips/:id
 * @access  Private
 */
export const getTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    res.json({
        success: true,
        data: trip,
    });
});

/**
 * @desc    Update trip
 * @route   PUT /api/trips/:id
 * @access  Private
 */
export const updateTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const allowed = [
        'title',
        'destination',
        'startDate',
        'endDate',
        'budget',
        'status',
        'travelStyle',
    ];
    allowed.forEach((key) => {
        if (req.body[key] !== undefined) trip[key] = req.body[key];
    });

    await trip.save();

    res.json({
        success: true,
        data: trip,
    });
});

/**
 * @desc    Soft delete trip
 * @route   DELETE /api/trips/:id
 * @access  Private
 */
export const deleteTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    trip.isDeleted = true;
    trip.deletedAt = new Date();
    await trip.save();

    res.json({
        success: true,
        message: 'Trip deleted',
    });
});

/**
 * @desc    Add itinerary day
 * @route   POST /api/trips/:id/itinerary
 * @access  Private
 */
export const addItineraryDay = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const { dayNumber, date, notes } = req.body;
    trip.itinerary.push({
        dayNumber: dayNumber ?? trip.itinerary.length + 1,
        date: date ? new Date(date) : undefined,
        activities: [],
        notes,
    });
    await trip.save();

    res.status(201).json({
        success: true,
        data: trip.itinerary[trip.itinerary.length - 1],
    });
});

/**
 * @desc    Add activity to day
 * @route   POST /api/trips/:id/itinerary/:dayIndex/activities
 * @access  Private
 */
export const addActivity = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const dayIndex = parseInt(req.params.dayIndex, 10);
    if (dayIndex < 0 || dayIndex >= trip.itinerary.length) {
        res.status(400);
        throw new Error('Invalid day index');
    }

    const order =
        req.body.order ??
        (trip.itinerary[dayIndex].activities?.length ?? 0);
    const activity = {
        ...req.body,
        order,
    };

    trip.itinerary[dayIndex].activities = trip.itinerary[dayIndex].activities || [];
    trip.itinerary[dayIndex].activities.push(activity);
    await trip.save();

    const added = trip.itinerary[dayIndex].activities[trip.itinerary[dayIndex].activities.length - 1];

    res.status(201).json({
        success: true,
        data: added,
    });
});

/**
 * @desc    Reorder activities in a day
 * @route   PUT /api/trips/:id/itinerary/:dayIndex/activities/reorder
 * @access  Private
 */
export const reorderActivities = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const dayIndex = parseInt(req.params.dayIndex, 10);
    if (dayIndex < 0 || dayIndex >= trip.itinerary.length) {
        res.status(400);
        throw new Error('Invalid day index');
    }

    const { activityIds } = req.body;
    if (!Array.isArray(activityIds)) {
        res.status(400);
        throw new Error('activityIds must be an array');
    }

    const activities = trip.itinerary[dayIndex].activities || [];
    const reordered = activityIds.map((id, idx) => {
        const act = activities.find((a) => a._id.toString() === id);
        if (act) act.order = idx;
        return act;
    }).filter(Boolean);

    trip.itinerary[dayIndex].activities = reordered;
    await trip.save();

    res.json({
        success: true,
        data: trip.itinerary[dayIndex].activities,
    });
});
