import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Import Outlet
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth(); // Get the user from the context
  console.log("ProtectedRoute: Current user state:", user);

  if (!user) {
    console.warn("ProtectedRoute: User not authenticated. Redirecting to /login.");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: User authenticated. Rendering protected content.");
  return <Outlet />;
};

export default ProtectedRoute;
