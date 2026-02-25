import api from './api.js';

/**
 * Trip service — CRUD + AI generation wrappers.
 */

export const tripService = {
    /** Get all trips for the logged-in user */
    getTrips: async () => {
        const { data } = await api.get('/trips');
        return data;
    },

    /** Create a new trip */
    createTrip: async (tripData) => {
        const { data } = await api.post('/trips', tripData);
        return data;
    },

    /** Get a single trip by ID */
    getTripById: async (id) => {
        const { data } = await api.get(`/trips/${id}`);
        return data;
    },

    /** Update a trip */
    updateTrip: async (id, tripData) => {
        const { data } = await api.put(`/trips/${id}`, tripData);
        return data;
    },

    /** Delete a trip */
    deleteTrip: async (id) => {
        const { data } = await api.delete(`/trips/${id}`);
        return data;
    },

    /** AI-generate a trip itinerary */
    aiGenerateTrip: async (prompt) => {
        const { data } = await api.post('/trips/generate', prompt);
        return data;
    },

    /** Add a day to a trip itinerary */
    addTripDay: async (tripId, dayData) => {
        const { data } = await api.post(`/trips/${tripId}/itinerary`, dayData);
        return data;
    },

    /** Add an activity to a specific day */
    addActivity: async (tripId, dayId, activityData) => {
        const { data } = await api.post(
            `/trips/${tripId}/itinerary/${dayId}/activity`,
            activityData
        );
        return data;
    },
};
