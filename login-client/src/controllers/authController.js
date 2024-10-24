// src/controllers/authController.js
import { login, signup, deregister, fetchProfile, logout, sendEmail, verifyOtp, sendVerEmail, verifyEmailToken, updateMfaStatus } from '../models/authModel';

export const loginController = async (email, password) => {
    try {
        const response = await login(email, password);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Login error' };
    }
};

export const signupController = async (email, password, userName) => {
    try {
        const response = await signup(email, password, userName);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Signup error' };
    }
};

export const fetchProfileController = async () => {
    try {
        const response = await fetchProfile();
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Fetch profile error' };
    }
};

export const logoutController = async () => {
    try {
        const response = await logout();
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Logout error' };
    }
};

export const sendEmailController = async (email) => {
    try {
        const response = await sendEmail(email);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Send email error' };
    }
};

export const validateOtp = async (email, otp) => {
    try {
        const response = await verifyOtp(email, otp);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'OTP validation error' };
    }
};

export const sendVerificationEmail = async (email) => {
    try {
        const response = await sendVerEmail(email);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Send email error' };
    }
};

export const verifyEmail = async (token) => {
    try {
        const response = await verifyEmailToken(token);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Email verification error' };
    }
};

export const updateMfa = async (email, mfaStatus) => {
    try {
        const response = await updateMfaStatus(email, mfaStatus);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'MFA update error' };
    }
};

export const deleteUser = async (email) => {
    try {
        const response = await deregister(email);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Delete user error' };
    }
};
