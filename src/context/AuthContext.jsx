import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        if (email === 'admin@a.com' && password === 'admin123') {
            setUser({ email, role: 'Admin' });
            return true;
        }
        if (email === 'visitor@v.com' && password === 'visi123') {
            setUser({ email, role: 'Visitor' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
