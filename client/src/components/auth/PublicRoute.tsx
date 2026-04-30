import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../ui/Spinner";

const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to="/matches" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
