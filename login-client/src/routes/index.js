// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/SignUp.js';
import Home from '../components/Home';
import Profile from '../components/Profile.js';
import OtpPage from '../components/OtpPage.js';
import VerifyEmail from '../components/VerifyEmail.js';
import { LoginProvider } from '../context/LoginContext.js';
import ForgotPassword from '../components/ForgotPassword.js';
import ResetPassword from '../components/ResetPassword.js';
import OtpSelection from '../components/OtpSelection.js';
import TotpLogin from '../components/TotpLogin.js';

const AppRoutes = () => (
    <LoginProvider>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpPage />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/totp" element={<TotpLogin />}/>
        <Route path="/otp-selection" element={<OtpSelection />} />
        <Route path="/" element={<Home />} />
    </Routes>
    </LoginProvider>
);

export default AppRoutes;