import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    // No logueado
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Rol no permitido
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/403" replace />;
    }

    // Acceso permitido
    return children;
}

export default ProtectedRoute;
