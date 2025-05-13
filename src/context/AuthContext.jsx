import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            authService.getProfile(savedToken)
                .then((data) => {
                    setUser(data);
                    setToken(savedToken);
                })
                .catch(() => {
                    logout();
                });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { access_token } = await authService.login(email, password);
            localStorage.setItem('token', access_token);
            const profile = await authService.getProfile(access_token);

            setUser(profile);
            setToken(access_token);
            return true;
        } catch (error) {
            console.error("Login fallido:", error.response?.data || error.message);
            return false;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
