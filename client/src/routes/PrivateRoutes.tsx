import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { user, token } = useAuth();

  return user && token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
