import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.auth.value);

  return user !== undefined ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
