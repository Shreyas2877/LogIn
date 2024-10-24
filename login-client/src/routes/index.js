// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/SignUp.js';
import Deregister from '../components/Deregister';
import Home from '../components/Home';
import Profile from '../components/Profile.js';
import OtpPage from '../components/OtpPage.js';
import VerifyEmail from '../components/VerifyEmail.js';
import { LoginProvider } from '../context/LoginContext.js';

const AppRoutes = () => (
    <LoginProvider>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpPage />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/deregister" element={<Deregister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Home />} />
    </Routes>
    </LoginProvider>
);

export default AppRoutes;