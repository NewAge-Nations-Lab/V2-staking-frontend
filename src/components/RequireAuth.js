import React from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, loginPath }) => {
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated()) {
        return <Navigate to={loginPath} />;
    }

    return children;
};

export default RequireAuth;
