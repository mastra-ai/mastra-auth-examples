// PublicRoute.jsx
import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";

export default function PublicRoutes({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
