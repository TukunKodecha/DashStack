import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { userRole } = useSelector((state) => state.auth);

  // If user exists, allow access to the element
  return userRole ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
