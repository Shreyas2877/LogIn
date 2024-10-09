// src/controllers/authController.js
import { login, signup, deregister } from '../models/authModel'

export const loginController = async (email, password) => {
    try {
        const response = await login(email, password);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message)
        return { success: false, message: error.response?.data?.message || 'Login error' };
    }
};

export const signupController = async (email, password) => {
    try {
        const response = await signup(email, password);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message)
        return { success: false, message: error.response?.data?.message || 'Signup error' };
    }
};

export const deregisterController = async (email) => {
    try {
        const response = await deregister(email);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error Caught : %s", error.message)
        return { success: false, message: error.response?.data?.message || 'Deregistration error' };
    }
};
