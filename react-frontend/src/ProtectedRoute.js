import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Use isAuthenticated

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectedRoute;
