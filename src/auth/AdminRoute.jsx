import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "./context/AuthContext"; // Ajusta la ruta si es necesario
import { CustomLoader } from "../components/common/CustomLoader"; // Importar el loader

export const AdminRoute = ({ children }) => {
  // Obtener user y el nuevo estado de carga
  const { user, isAuthLoading } = useContext(AuthContext);

  // Si está cargando, mostrar el loader
  if (isAuthLoading) {
    return <CustomLoader />;
  }

  // Una vez que la carga ha terminado, verificar si es Admin
  const isAdmin = user && user.tipoUsuario === "Admin";
  // console.log("isAdmin check after loading:", isAdmin, "User:", user); // Log de depuración si es necesario

  if (!isAdmin) {
    // Redirigir si NO es admin (o no está logueado porque user sería null)
    return <Navigate to="/forbiddenAdmin" replace />;
  }

  // Permitir acceso si es Admin
  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
