import mongoose from 'mongoose';
import activitySchema from './Activity.js';

const itineraryDaySchema = new mongoose.Schema(
    {
        dayNumber: {
            type: Number,
            required: [true, 'Day number is required'],
        },
        date: Date,
        activities: [activitySchema],
        notes: String,
    },
    { _id: true }
);

export default itineraryDaySchema;
