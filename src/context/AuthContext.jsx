import { useAtom } from "jotai";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthAtom } from "../service/states/auth.atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("authData");
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
  } catch (e) {
    console.error("Error reading value from AsyncStorage:", e);
  }
};

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context is not in the scope");
  return context;
};

const AuthContextProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [authState, setAuthState] = useAtom(AuthAtom);
  const { removeData } = useLocalStorage("auth");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await removeData();

      setAuthState({
        isAuthenticated: false,
        token: null,
        role: "N/A",
        UID: null,
      });

      queryClient.clear();
      router.dismissAll();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
