import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { canAccessAdminRoute } from "@/lib/roles";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading admin session...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!canAccessAdminRoute(user.role, location.pathname)) {
    return <div className="flex min-h-screen items-center justify-center p-6 text-center text-sm text-muted-foreground">You do not have permission to access this section.</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
