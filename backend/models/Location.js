import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Location name is required'],
            trim: true,
        },
        address: String,
        lat: {
            type: Number,
            required: [true, 'Latitude is required'],
        },
        lng: {
            type: Number,
            required: [true, 'Longitude is required'],
        },
        placeId: String,
        photoUrl: String,
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip',
        },
    },
    {
        timestamps: true,
    }
);

locationSchema.index({ lat: 1, lng: 1 });
locationSchema.index({ trip: 1 });

const Location = mongoose.model('Location', locationSchema);
export { locationSchema };
export default Location;
