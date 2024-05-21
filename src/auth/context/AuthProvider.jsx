import { AuthContext } from "./AuthContext";

import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: {
      name: "test",
      email: "test",
      image:
        "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png",
    },
  });

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
