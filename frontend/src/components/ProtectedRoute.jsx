// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
