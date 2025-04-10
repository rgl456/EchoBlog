import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children (protected content)
  return children;
};

export default ProtectedRoute;