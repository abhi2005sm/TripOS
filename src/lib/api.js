import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 15000,
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Attach the JWT access token to every outgoing request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tripos_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────
// On 401, silently attempt to refresh the access token using the refresh token.
// If refresh fails, clear storage and redirect to login.
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh') &&
            !originalRequest.url.includes('/auth/login')
        ) {
            if (isRefreshing) {
                // Queue additional requests while refresh is in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('tripos_refresh_token');

            if (!refreshToken) {
                // No refresh token — force logout
                clearAuthStorage();
                window.location.href = '/';
                return Promise.reject(error);
            }

            try {
                const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken,
                });
                const newToken = data.token;
                localStorage.setItem('tripos_token', newToken);
                api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                clearAuthStorage();
                window.location.href = '/';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

function clearAuthStorage() {
    localStorage.removeItem('tripos_token');
    localStorage.removeItem('tripos_refresh_token');
    localStorage.removeItem('tripos_user');
}

export default api;
