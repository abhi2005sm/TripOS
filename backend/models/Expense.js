import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
    {
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add an expense title'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
            min: [0, 'Amount cannot be negative'],
        },
        currency: {
            type: String,
            default: 'INR',
            maxlength: 3,
        },
        category: {
            type: String,
            enum: [
                'food',
                'transport',
                'accommodation',
                'activities',
                'shopping',
                'flights',
                'other',
            ],
            default: 'other',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        note: {
            type: String,
            maxlength: [500, 'Note cannot exceed 500 characters'],
        },
    },
    {
        timestamps: true,
    }
);

expenseSchema.index({ trip: 1, date: -1 });
expenseSchema.index({ user: 1, trip: 1 });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
