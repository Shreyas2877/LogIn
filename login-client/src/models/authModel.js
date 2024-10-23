// src/models/authModel.js
import axiosInstance from '../apiConfig';

export const login = (email, password) => {
    return axiosInstance.post('/auth/login', { email, password });
};

export const signup = (email, password, userName) => {
    return axiosInstance.post('/auth/signup', { email, password, userName });
};

export const deregister = (email) => {
    return axiosInstance.post('/auth/deregister', { email });
};

export const fetchProfile = () => {
    return axiosInstance.get('/auth/profile');
};

export const logout = () => {
    return axiosInstance.post('/auth/logout');
};

export const sendEmail = (email) => {
    return axiosInstance.post('/email/send?email='+email);
};

export const verifyOtp = (email, otp) => {
    return axiosInstance.post('/email/validate?email='+email+'&otp='+otp);
};