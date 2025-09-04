import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/auth-context";

const PUBLIC_PAGES = ["sign-in", "sign-up", "forgot-password", "reset-password"];

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const formattedPathname = pathname.replaceAll("/", "").trim();

  if (isAuthenticated && PUBLIC_PAGES.includes(formattedPathname)) {
    const redirectTo = user?.role === 'USER' ? '/' : '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;