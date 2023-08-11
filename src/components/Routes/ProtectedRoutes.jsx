import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
