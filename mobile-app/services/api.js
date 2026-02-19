import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// REPLACE WITH YOUR PC's IP ADDRESS
const BASE_URL = 'http://10.232.51.246:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[API Request] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error('[Network Error] Could not connect to backend. Check if IP is correct and Firewall is allowing port 5000.');
            console.error(`Attempted URL: ${error.config?.baseURL}${error.config?.url}`);
        } else if (error.response) {
            console.error(`[API Error] ${error.response.status} - ${error.response.data.message}`);
        } else {
            console.error('[API Error]', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
