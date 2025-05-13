import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
    return response.data;
};

export const register = async (datos) => {
    const response = await axios.post(`${API_BASE_URL}/register`, datos);
    return response.data;
};

export const getProfile = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};
