import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RoleBasedRoute = ({ element, allowedRoles }) => {
  const location = useLocation();

  const { userRole } = useSelector((state) => state.auth);

  return !userRole ? (
    <Navigate to="/" state={{ from: location }} />
  ) : !allowedRoles.includes(userRole) ? (
    <Navigate to="/not-authorized" state={{ from: location }} />
  ) : (
    element
  );
};

export default RoleBasedRoute;
