import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "./context/AuthContext"; // Ajusta la ruta si es necesario

export const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Verificar si es Admin
  const isAdmin = user && user.tipoUsuario === "Admin";

  if (!isAdmin) {
    // Redirigir si no es admin o no está logueado
    return <Navigate to="/forbiddenAdmin" replace />;
  }

  // Permitir acceso si es Admin
  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
