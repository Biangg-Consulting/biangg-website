import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/auth/auth-context";
import { useEffect } from "react";

export const ProtectedAdminRoute = () => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {

  }, [user])

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user?.role !== 'SUPER_ADMIN' && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};