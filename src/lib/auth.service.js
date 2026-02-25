import api from './api.js';

/**
 * Auth service — thin wrappers around the backend auth endpoints.
 * All responses return { data } from Axios.
 */

export const authService = {
    /**
     * Login with email and password.
     * Returns user profile + tokens.
     */
    login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        return data;
    },

    /**
     * Register a new user.
     * Returns user profile + tokens.
     */
    register: async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    },

    /**
     * Refresh the access token.
     */
    refresh: async (refreshToken) => {
        const { data } = await api.post('/auth/refresh', { refreshToken });
        return data;
    },
};
