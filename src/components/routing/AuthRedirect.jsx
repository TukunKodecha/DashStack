// AuthRedirect.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthRedirect = ({ element }) => {
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  if (user && user?.role) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return element;
};

export default AuthRedirect;
