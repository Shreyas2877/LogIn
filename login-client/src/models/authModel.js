// src/models/authModel.js
import axiosInstance from '../apiConfig';

export const login = (email, password) => {
    return axiosInstance.post('/api/auth/login', { email, password });
};

export const signup = (email, password) => {
    return axiosInstance.post('/api/auth/signup', { email, password });
};

export const deregister = (email) => {
    return axiosInstance.post('/api/auth/deregister', { email });
};

export const fetchProfile = () => {
    return axiosInstance.get('/api/auth/profile');
};