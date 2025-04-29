import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Verifica si el usuario existe y tiene el rol restringido
  const isForbidden =
    user && (user.tipoUsuario === "Admin" || user.tipoUsuario === "Preparador");

  if (isForbidden) {
    // Redirige a la página de acceso denegado si el rol está restringido
    return <Navigate to="/forbidden" replace />;
  }

  // Si no está restringido (no logueado o rol permitido), muestra el contenido
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
