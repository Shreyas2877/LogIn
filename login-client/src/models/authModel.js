// src/models/authModel.js
import axios from 'axios';
import { API_URL } from '../apiConfig';

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

export const signup = (email, password) => {
    return axios.post(`${API_URL}/signup`, { email, password });
};

export const deregister = (email) => {
    return axios.post(`${API_URL}/deregister`, { email });
};
