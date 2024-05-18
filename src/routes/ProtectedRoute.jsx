import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const currentUser = Cookies.get("token");

  if (currentUser === undefined) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
