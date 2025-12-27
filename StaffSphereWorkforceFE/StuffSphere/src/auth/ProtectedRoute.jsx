import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  // Not logged in
  if (!auth || !auth.token) {
    return <Navigate to="/" replace />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
