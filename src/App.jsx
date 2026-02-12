import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import NewJourney from './pages/NewJourney';
import Timeline from './pages/Timeline';
import Budget from './pages/Budget';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="new-journey" element={<NewJourney />} />
                    <Route path="timeline" element={<Timeline />} />
                    <Route path="budget" element={<Budget />} />
                    <Route path="map" element={<Map />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
