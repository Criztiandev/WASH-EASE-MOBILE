import React, { useEffect, useState } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "jotai";
import Toast from "react-native-toast-message";
import AuthContextProvider, { useAuthContext } from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const determineRoute = (role) => {
  const routes = {
    user: "/customer/home",
    rider: "/rider/home",
  };
  return routes[role] || "/";
};
const queryClient = new QueryClient();

const RootStackLayout = () => {
  const { authState } = useAuthContext();
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
      <QueryClientProvider client={queryClient}>
        <Provider>
          <PaperProvider>
            <AuthContextProvider>
              <RootStackLayout />
            </AuthContextProvider>
          </PaperProvider>
        </Provider>
        <Toast />
      </QueryClientProvider>
    </>
  );
};

export default _layout;
