import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/admin-users" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/403" replace />;
    }

    return children;
}

export default ProtectedRoute;
