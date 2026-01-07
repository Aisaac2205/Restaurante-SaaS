import axios from 'axios';

// URL Base del Backend. En desarrollo es localhost:3000
// En producción debería venir de import.meta.env.VITE_API_URL
export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL,
});

// Interceptor para inyectar token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('No token found in localStorage');
    }
    return config;
});

export default api;
