import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { uploadImage } from '../services/cloudinary.service.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            preferences: user.preferences,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.preferences) {
            user.preferences = { ...user.preferences, ...req.body.preferences };
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            avatar: updatedUser.avatar,
            preferences: updatedUser.preferences,
            token: req.headers.authorization.split(' ')[1],
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user avatar
// @route   POST /api/users/avatar
// @access  Private
export const updateUserAvatar = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload an image');
    }

    const result = await uploadImage(req.file.path);

    const user = await User.findById(req.user._id);
    user.avatar = {
        url: result.url,
        public_id: result.public_id,
    };

    await user.save();

    res.json({
        message: 'Avatar updated successfully',
        avatar: user.avatar,
    });
});
