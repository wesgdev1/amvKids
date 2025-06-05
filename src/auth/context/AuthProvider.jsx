import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    // user: {
    //   name: "test",
    //   email: "test",
    //   image:
    //     "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png",
    // },
  });

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const init = async () => {
    try {
      const json = localStorage.getItem("user");
      if (json) {
        const user = JSON.parse(json);
        setAuthState({ user });
      }
    } catch (error) {
      console.error("Error al inicializar AuthProvider:", error);
      setAuthState({});
    } finally {
      setIsAuthLoading(false);
    }
  };

  const login = (payload) => {
    localStorage.setItem("user", JSON.stringify(payload));
    init();
  };

  const logout = () => {
    setAuthState({});
    localStorage.clear();
    window.location = "/login";
  };

  const cambiarImagen = (imagen) => {
    const user = { ...authState.user, urlFoto: imagen };
    setAuthState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  const actualizarDatosPersonales = (datos) => {
    const user = { ...authState.user, ...datos };
    setAuthState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  const actualizarDirecciones = (direcciones) => {
    const user = {
      ...authState.user,
      directions: [...authState.user.directions, direcciones],
    };
    setAuthState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  const eliminarDireccion = (directionId) => {
    const user = {
      ...authState.user,
      directions: authState.user.directions.filter(
        (direction) => direction.id !== directionId
      ),
    };
    setAuthState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isAuthLoading,
        setAuthState,
        login,
        logout,
        cambiarImagen,
        actualizarDatosPersonales,
        actualizarDirecciones,
        eliminarDireccion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
