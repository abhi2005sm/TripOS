import asyncHandler from 'express-async-handler';
import Expense from '../models/Expense.js';
import Trip from '../models/Trip.js';

// @desc    Add a new expense
// @route   POST /api/expenses
// @access  Private
export const addExpense = asyncHandler(async (req, res) => {
    const { trip: tripId, title, amount, category, date, note } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const expense = await Expense.create({
        trip: tripId,
        user: req.user._id,
        title,
        amount,
        category,
        date,
        note,
    });

    res.status(201).json(expense);
});

// @desc    Get expenses for a trip
// @route   GET /api/expenses/trip/:tripId
// @access  Private
export const getTripExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({
        trip: req.params.tripId,
        user: req.user._id,
    }).sort({ date: -1 });

    // Calculate totals
    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const categoryBreakdown = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    res.json({ expenses, totalSpent, categoryBreakdown });
});

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
export const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (expense && expense.user.toString() === req.user._id.toString()) {
        expense.title = req.body.title || expense.title;
        expense.amount = req.body.amount || expense.amount;
        expense.category = req.body.category || expense.category;
        expense.date = req.body.date || expense.date;
        expense.note = req.body.note || expense.note;

        const updatedExpense = await expense.save();
        res.json(updatedExpense);
    } else {
        res.status(404);
        throw new Error('Expense not found');
    }
});

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (expense && expense.user.toString() === req.user._id.toString()) {
        await expense.deleteOne();
        res.json({ message: 'Expense removed' });
    } else {
        res.status(404);
        throw new Error('Expense not found');
    }
});
