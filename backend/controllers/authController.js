import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateToken.js';

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
    });

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        preferences: user.preferences,
        token: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user._id),
    };
    res.status(201).json({ success: true, data: payload, ...payload });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select(
        '+password'
    );

    if (!user || !(await user.matchPassword(password))) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        preferences: user.preferences,
        token: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user._id),
    };
    res.json({ success: true, data: payload, ...payload });
});

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refresh = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400);
        throw new Error('Refresh token required');
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401);
            throw new Error('Invalid refresh token');
        }

        const token = generateAccessToken(user._id);
        res.json({ success: true, data: { token }, token });
    } catch (err) {
        res.status(401);
        throw new Error('Refresh token expired or invalid');
    }
});

/**
 * @desc    Logout (client-side token invalidation; blacklist can be added)
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully',
    });
});
