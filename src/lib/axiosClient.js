import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data; 
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;