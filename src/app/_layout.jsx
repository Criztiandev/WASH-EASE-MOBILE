import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "jotai";
import Toast from "react-native-toast-message";
import AuthContextProvider, { useAuthContext } from "../context/AuthContext";

const determineRoute = (role) => {
  const routes = {
    user: "/customer/home",
    rider: "/rider/home",
  };
  return routes[role] || "/";
};

const RootStackLayout = () => {
  const { authState } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const { isAuthenticated, role } = authState;

    if (isAuthenticated === null || isAuthenticated === false) {
      router.replace("/");
    }

    const currentRoute = determineRoute(role);
    router.replace(currentRoute);
  }, [authState]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

const _layout = () => {
  return (
    <>
      <Provider>
        <PaperProvider>
          <AuthContextProvider>
            <RootStackLayout />
          </AuthContextProvider>
        </PaperProvider>
      </Provider>
      <Toast />
    </>
  );
};

export default _layout;
