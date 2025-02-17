import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoutes = () => {
  const { user, token } = useAuth();
  return user && token ? (
    <Navigate
      to={"/"}
      replace={true}
    />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
