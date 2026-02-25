import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import NewJourney from './pages/NewJourney';
import Timeline from './pages/Timeline';
import Budget from './pages/Budget';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PageTitle from './components/utils/PageTitle';


function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<><PageTitle /><Landing /></>} />
                        <Route path="/login" element={<><PageTitle title="Login" /><Login /></>} />
                        <Route path="/register" element={<><PageTitle title="Register" /><Register /></>} />

                        {/* Protected routes — wrapped in ProtectedRoute */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<Layout />}>
                                <Route path="new-journey" element={<><PageTitle title="Start Journey" /><NewJourney /></>} />
                                <Route path="timeline" element={<><PageTitle title="Timeline" /><Timeline /></>} />
                                <Route path="budget" element={<><PageTitle title="Budget" /><Budget /></>} />
                                <Route path="map" element={<><PageTitle title="World Map" /><Map /></>} />
                                <Route path="profile" element={<><PageTitle title="My Profile" /><Profile /></>} />
                                <Route path="settings" element={<><PageTitle title="Settings" /><Settings /></>} />
                            </Route>
                        </Route>

                        {/* Catch all redirect to landing */}
                        <Route path="*" element={<Landing />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}

export default App;
