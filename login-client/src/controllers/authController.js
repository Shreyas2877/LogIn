// src/controllers/authController.js
import { login, signup, deregister, fetchProfile, logout, sendEmail, verifyOtp, sendVerEmail, verifyEmailToken, updateMfaStatus, sendPasswordRestEmail, resetPassword, generateQrCode, validateTotp, sendMessage, getMessages } from '../models/authModel';

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

export const sendResetPasswordEmail = async (email) => {
    try {
        const response = await sendPasswordRestEmail(email);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Failed to send reset password email' };
    }
};

export const resetPasswordController = async (email, password) => {
    try {
        const response = await resetPassword(email, password);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Reset password error' };
    }
};

export const generateTotpQrCode = async (email) => {
    try {
        const response = await generateQrCode(email);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.message || 'Failed to generate qr code for authenticator' };
    }
};

export const validateVerificationToken = async (email, code) => {
    try {
        const response = await validateTotp(email, code);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.message || 'Failed to validate verification token' };
    }
};

export const postMessage = async (senderId, senderName, content, timeStamp) => {
    try {
        const response = await sendMessage(senderId, senderName, content, timeStamp);
        return { success: true, data: response.data };
    }
    catch (error) {
        return { success: false, message: error.message || 'Failed to send message' };
    }
};

export const fetchMessages = async () => {
    try {
        const response = await getMessages();
        return { success: true, data: response.data };
    }
    catch (error) {
        return { success: false, message: error.message || 'Failed to fetch messages' };
    }
};