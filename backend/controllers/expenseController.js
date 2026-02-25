import asyncHandler from 'express-async-handler';
import Expense from '../models/Expense.js';
import Trip from '../models/Trip.js';

/**
 * @desc    Add expense
 * @route   POST /api/expenses
 * @access  Private
 */
export const addExpense = asyncHandler(async (req, res) => {
    const trip = await Trip.findOne({
        _id: req.body.trip,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const expense = await Expense.create({
        ...req.body,
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        data: expense,
    });
});

/**
 * @desc    Get expenses for trip
 * @route   GET /api/expenses?trip=:tripId
 * @access  Private
 */
export const getExpenses = asyncHandler(async (req, res) => {
    const { trip: tripId } = req.query;

    if (!tripId) {
        res.status(400);
        throw new Error('Trip ID required');
    }

    const trip = await Trip.findOne({
        _id: tripId,
        user: req.user._id,
    });

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const expenses = await Expense.find({ trip: tripId }).sort({ date: -1 });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {});

    const budgetTotal = trip.budget?.total || 0;
    const progressPercent =
        budgetTotal > 0 ? Math.min(100, (total / budgetTotal) * 100) : 0;

    res.json({
        success: true,
        data: {
            expenses,
            total,
            byCategory,
            budget: {
                total: budgetTotal,
                spent: total,
                remaining: Math.max(0, budgetTotal - total),
                progressPercent,
            },
        },
    });
});

/**
 * @desc    Update expense
 * @route   PUT /api/expenses/:id
 * @access  Private
 */
export const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!expense) {
        res.status(404);
        throw new Error('Expense not found');
    }

    const allowed = ['title', 'amount', 'currency', 'category', 'date', 'note'];
    allowed.forEach((key) => {
        if (req.body[key] !== undefined) expense[key] = req.body[key];
    });

    await expense.save();

    res.json({
        success: true,
        data: expense,
    });
});

/**
 * @desc    Delete expense
 * @route   DELETE /api/expenses/:id
 * @access  Private
 */
export const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!expense) {
        res.status(404);
        throw new Error('Expense not found');
    }

    await expense.deleteOne();

    res.json({
        success: true,
        message: 'Expense deleted',
    });
});
