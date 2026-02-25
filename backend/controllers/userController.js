import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json({
        success: true,
        data: user,
    });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const fields = {};

    if (name) fields.name = name;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: fields },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        data: user,
    });
});

/**
 * @desc    Upload avatar
 * @route   POST /api/users/avatar
 * @access  Private
 */
export const uploadAvatar = asyncHandler(async (req, res) => {
    if (!req.file || !req.file.buffer) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.avatar?.public_id) {
        await deleteFromCloudinary(user.avatar.public_id);
    }

    const result = await uploadToCloudinary(
        req.file.buffer,
        `tripos/avatars/${req.user._id}`
    );

    user.avatar = {
        url: result.secure_url,
        public_id: result.public_id,
    };
    await user.save();

    res.json({
        success: true,
        data: {
            avatar: user.avatar,
        },
    });
});

/**
 * @desc    Update preferences
 * @route   PUT /api/users/preferences
 * @access  Private
 */
export const updatePreferences = asyncHandler(async (req, res) => {
    const { currency, language, pace, budgetMode } = req.body;

    const updates = {};
    if (currency) updates['preferences.currency'] = currency;
    if (language) updates['preferences.language'] = language;
    if (pace) updates['preferences.pace'] = pace;
    if (budgetMode) updates['preferences.budgetMode'] = budgetMode;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        data: user.preferences,
    });
});
