import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import AuthContextProvider, { useAuthContext } from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "jotai";
import useLocalStorage from "../hooks/useLocalStorage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "../../SplashScreen";

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
  const { getData } = useLocalStorage("splash");
  const [isShowSpashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    const checkIsAlreadySplashScreen = async () => {
      const payload = await getData();
      if (payload && payload.isAlreadySplashed === true) {
        setIsShowSplashScreen(false);
      }
    };

    checkIsAlreadySplashScreen();
  }, []);

  return (
    <>
      {isShowSpashScreen ? (
        <SplashScreen />
      ) : (
        <>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Provider>
                <PaperProvider>
                  <AuthContextProvider>
                    <RootStackLayout />
                  </AuthContextProvider>
                </PaperProvider>
              </Provider>
            </GestureHandlerRootView>
            <Toast />
          </QueryClientProvider>
        </>
      )}
    </>
  );
};

export default _layout;
