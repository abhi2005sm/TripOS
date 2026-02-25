import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../lib/auth.service.js';

const AuthContext = createContext(null);

const TOKEN_KEY = 'tripos_token';
const REFRESH_KEY = 'tripos_refresh_token';
const USER_KEY = 'tripos_user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // true while hydrating from storage

    // ── Hydrate state from localStorage on first mount ──────────────────────
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);
        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch {
                // Corrupted storage — clear it
                clearStorage();
            }
        }
        setLoading(false);
    }, []);

    // ── Helpers ──────────────────────────────────────────────────────────────
    const persistSession = (userData, accessToken, refreshToken) => {
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_KEY, refreshToken);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setToken(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const clearStorage = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
    };

    // ── Auth actions ─────────────────────────────────────────────────────────
    const login = useCallback(async (email, password) => {
        const data = await authService.login(email, password);
        persistSession(
            { _id: data._id, name: data.name, email: data.email, role: data.role, avatar: data.avatar },
            data.token,
            data.refreshToken
        );
        return data;
    }, []);

    const register = useCallback(async (name, email, password) => {
        const data = await authService.register(name, email, password);
        persistSession(
            { _id: data._id, name: data.name, email: data.email, role: data.role },
            data.token,
            data.refreshToken
        );
        return data;
    }, []);

    const logout = useCallback(() => {
        clearStorage();
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};
