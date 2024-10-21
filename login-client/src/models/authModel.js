// src/models/authModel.js
import axiosInstance from '../apiConfig';

export const login = (email, password) => {
    return axiosInstance.post('/login', { email, password });
};

export const signup = (email, password, userName) => {
    return axiosInstance.post('/signup', { email, password, userName });
};

export const deregister = (email) => {
    return axiosInstance.post('/deregister', { email });
};

export const fetchProfile = () => {
    return axiosInstance.get('/profile');
};