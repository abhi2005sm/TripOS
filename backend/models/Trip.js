import mongoose from 'mongoose';
import itineraryDaySchema from './ItineraryDay.js';

const tripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a trip title'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        destination: {
            name: { type: String, required: true },
            lat: Number,
            lng: Number,
            placeId: String,
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
        },
        budget: {
            total: { type: Number, default: 0 },
            currency: { type: String, default: 'INR' },
        },
        itinerary: [itineraryDaySchema],
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
        coverImage: String,
        status: {
            type: String,
            enum: ['planning', 'ongoing', 'completed', 'cancelled'],
            default: 'planning',
        },
        travelStyle: String,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

tripSchema.index({ user: 1, createdAt: -1 });
tripSchema.index({ isDeleted: 1, user: 1 });

tripSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
