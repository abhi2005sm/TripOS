import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Activity title is required'],
        },
        location: {
            name: String,
            lat: Number,
            lng: Number,
            placeId: String,
            address: String,
        },
        startTime: String,
        endTime: String,
        description: String,
        type: {
            type: String,
            enum: ['sightseeing', 'dining', 'transport', 'leisure', 'hotel', 'other'],
            default: 'sightseeing',
        },
        order: {
            type: Number,
            default: 0,
        },
        cost: Number,
        currency: String,
    },
    { _id: true }
);

export default activitySchema;
