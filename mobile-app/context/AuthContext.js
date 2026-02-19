import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, ...userData } = response.data;

            setUserToken(token);
            setUserInfo(userData);

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            await api.post('/auth/signup', userData);
            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            console.log('Register API Error:', error);
            if (error.response) {
                return { success: false, message: error.response.data.message || 'Server Error' };
            } else if (error.request) {
                return { success: false, message: 'Network Error: Server Unreachable. Check Wi-Fi.' };
            } else {
                return { success: false, message: error.message };
            }
        }
    };

    const logout = async () => {
        setLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userInfo');
        setLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setLoading(true);
            let token = await AsyncStorage.getItem('token');
            let user = await AsyncStorage.getItem('userInfo');

            if (token) {
                setUserToken(token);
                if (user) setUserInfo(JSON.parse(user));

                // Fetch fresh profile in background
                try {
                    const response = await api.get('/auth/profile');
                    if (response.data) {
                        // Keep the token, update other user data
                        const userData = { ...response.data, token };
                        setUserInfo(userData);
                        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
                    }
                } catch (error) {
                    console.log('Failed to fetch user profile:', error);
                    if (error.response?.status === 401) {
                        logout();
                    }
                }
            }
            setLoading(false);
        } catch (error) {
            console.log(`isLogged in error ${error}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, register, logout, loading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
