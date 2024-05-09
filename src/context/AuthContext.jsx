import { useAtom } from "jotai";
import { createContext, useContext, useState } from "react";
import { AuthAtom } from "../service/states/auth.atoms";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context is not in the scope");
  return context;
};

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useAtom(AuthAtom);

  const handleLogin = (value) => {
    setAuthState((prev) => ({
      isAuthenticated: true,
      role: "user",
    }));
  };

  const handleLogout = () => {
    setAuthState((prev) => ({
      isAuthenticated: false,
      role: "N/A",
    }));
  };

  return (
    <AuthContext.Provider value={{ authState, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
