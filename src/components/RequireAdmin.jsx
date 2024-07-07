// RequireAdmin.js
import React from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const auth = useAuthUser();
  const token = useAuthHeader();

  if (!token() || !auth()) {
    return <Navigate to="/login" />;
  }

  if (!auth().isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RequireAdmin;
