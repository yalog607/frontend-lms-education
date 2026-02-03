import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const AdminRoute = ({ user, redirectPath = "/", children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const GuestRoute = ({ user, redirectPath = "/home", children }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};