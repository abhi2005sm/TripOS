import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * Wraps protected routes.
 * - While auth state is loading (hydrating from localStorage) → show spinner.
 * - If not authenticated → redirect to login page (/).
 * - Otherwise → render the child route via <Outlet />.
 */
const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-dark">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-text-secondary text-sm">Loading…</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
