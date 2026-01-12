import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../pages/context/AuthContext";

export default function RoleRoute({ children, allowedRoles = [] }) {
  const { user } = useContext(AuthContext);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return children;
}
