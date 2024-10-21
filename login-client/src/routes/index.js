// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/SignUp.js';
import Deregister from '../components/Deregister';
import Home from '../components/Home';
import Profile from '../components/Profile.js';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/deregister" element={<Deregister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
    </Routes>
);

export default AppRoutes;