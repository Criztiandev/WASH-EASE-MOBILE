import React, { useEffect, useState } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import AuthContextProvider, { useAuthContext } from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLocalStorage from "../hooks/useLocalStorage";

const queryClient = new QueryClient();

const RootStackLayout = () => {
  const { authState, setAuthState } = useAuthContext();
  const router = useRouter();
  const { getData } = useLocalStorage("auth");

  useEffect(() => {
    const checkAuth = async () => {
      const storedAuthData = await getData();
      if (storedAuthData && storedAuthData.isAuthenticated) {
        setAuthState(storedAuthData);
        return;
      } else {
        router.replace("/");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.replace("/(protected)");
    } else {
      router.replace("/");
    }
  }, [authState.isAuthenticated]);

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
