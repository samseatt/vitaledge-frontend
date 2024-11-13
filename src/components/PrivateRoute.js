// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Higher-order component for protected routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for authentication token

  // If no token, redirect to login
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
