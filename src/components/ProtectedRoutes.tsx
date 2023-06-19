import { useAppSelector } from "@hooks/states";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = Boolean(useAppSelector((state) => state.authReducer.token));

  if (!user) return <Navigate to={"/login"} />;

  return <Outlet />;
};

export default ProtectedRoutes;
 