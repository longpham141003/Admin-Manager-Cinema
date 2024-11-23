// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const expiryTime = localStorage.getItem('expiryTime');
        
        if (storedAuth === 'true' && expiryTime && new Date().getTime() < expiryTime) {
            setIsAuthenticated(true); 
        } else {
            logout(); 
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        //expire time được lấy từ access token thay vì hard code phía client
        const expiryTime = new Date().getTime() + 30 * 60 * 1000; 
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('expiryTime', expiryTime);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('expiryTime');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
