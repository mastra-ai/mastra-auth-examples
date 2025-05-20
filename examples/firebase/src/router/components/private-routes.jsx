import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
