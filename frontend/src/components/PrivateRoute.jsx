import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../pages/context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, token } = useContext(AuthContext);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
