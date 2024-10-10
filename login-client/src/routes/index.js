// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/SignUp.js';
import Deregister from '../components/Deregister';
import Home from '../components/Home';

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/deregister" element={<Deregister />} />
        <Route path="/home" element={<Home />} />
    </Routes>
);

export default AppRoutes;
