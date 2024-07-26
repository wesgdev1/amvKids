import { AuthContext } from "./AuthContext";

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

  const init = async () => {
    const json = localStorage.getItem("user");
    if (json) {
      const user = JSON.parse(json);
      setAuthState({ user });
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

  useEffect(() => {
    const inicializar = async () => {
      await init();
    };
    inicializar();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
