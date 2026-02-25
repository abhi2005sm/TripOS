import asyncHandler from 'express-async-handler';
import Location from '../models/Location.js';
import Trip from '../models/Trip.js';
import { reverseGeocode, getPlaceDetails } from '../services/mapsService.js';

/**
 * @desc    Add location
 * @route   POST /api/map/locations
 * @access  Private
 */
export const addLocation = asyncHandler(async (req, res) => {
    const { name, address, lat, lng, placeId, photoUrl, trip } = req.body;

    if (!lat || !lng || !name) {
        res.status(400);
        throw new Error('Name, lat, and lng are required');
    }

    if (trip) {
        const t = await Trip.findOne({ _id: trip, user: req.user._id });
        if (!t) {
            res.status(404);
            throw new Error('Trip not found');
        }
    }

    const location = await Location.create({
        name,
        address,
        lat,
        lng,
        placeId,
        photoUrl,
        trip,
    });

    res.status(201).json({
        success: true,
        data: location,
    });
});

/**
 * @desc    Reverse geocode
 * @route   GET /api/map/reverse-geocode?lat=&lng=
 * @access  Private
 */
export const reverseGeocodeHandler = asyncHandler(async (req, res) => {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);

    if (isNaN(lat) || isNaN(lng)) {
        res.status(400);
        throw new Error('Valid lat and lng are required');
    }

    const result = await reverseGeocode(lat, lng);

    res.json({
        success: true,
        data: result,
    });
});

/**
 * @desc    Get place details
 * @route   GET /api/map/place/:placeId
 * @access  Private
 */
export const getPlaceDetailsHandler = asyncHandler(async (req, res) => {
    const result = await getPlaceDetails(req.params.placeId);

    res.json({
        success: true,
        data: result,
    });
});

/**
 * @desc    Get trip map data (locations from trip + itinerary)
 * @route   GET /api/map/trip/:tripId
 * @access  Private
 */
export const getTripMapData = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.params.tripId,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const locations = await Location.find({ trip: trip._id });

    const itineraryLocations = [];
    (trip.itinerary || []).forEach((day) => {
        (day.activities || []).forEach((act) => {
            if (act.location?.lat && act.location?.lng) {
                itineraryLocations.push({
                    ...act.location,
                    title: act.title,
                    dayNumber: day.dayNumber,
                });
            }
        });
    });

    const data = {
        destination: trip.destination,
        locations,
        itineraryLocations,
    };

    res.json({
        success: true,
        data,
    });
});
