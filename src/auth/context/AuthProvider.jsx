import { AuthContext } from "./AuthContext";

import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ name: "test", email: "test" });

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
