// src/controllers/authController.js
import { login, signup, deregister, fetchProfile } from '../models/authModel';
import axiosInstance from '../apiConfig';

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

export const deregisterController = async (email) => {
    try {
        const response = await deregister(email);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, statusCode: error.response.status, message: error.response?.data?.message || 'Deregistration error' };
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
        await axiosInstance.post('/logout');
        return { success: true };
    } catch (error) {
        console.log("Error Caught : %s", error.message);
        return { success: false, message: error.response?.data?.message || 'Logout error' };
    }
};