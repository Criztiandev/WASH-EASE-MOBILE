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
import AnimatedSplash from "react-native-animated-splash-screen";

const queryClient = new QueryClient();

const RootStackNavigator = () => {
  const { authState, setAuthState } = useAuthContext();
  const router = useRouter();
  const { getData } = useLocalStorage("auth");
  const rootPath = "/";

  useEffect(() => {
    const checkAuth = async () => {
      const storedAuthData = await getData();
      if (storedAuthData && storedAuthData?.isAuthenticated) {
        setAuthState(storedAuthData);

        const currentRole = storedAuthData?.role.toLowerCase();
        router.replace(`${currentRole}/home`);
      } else {
        router.replace(rootPath);
      }
    };

    checkAuth();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

const AppLayout = () => {
  const { getData } = useLocalStorage("splash");
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    const checkIsAlreadySplashScreen = async () => {
      const payload = await getData();

      if (payload?.isAlreadySplashed) {
        setIsShowSplashScreen(false);
      }
    };

    checkIsAlreadySplashScreen();
  }, [getData]);

  return (
    <>
      {isShowSplashScreen ? (
        <SplashScreen setState={setIsShowSplashScreen} />
      ) : (
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider>
              <PaperProvider>
                <AuthContextProvider>
                  <RootStackNavigator />
                </AuthContextProvider>
              </PaperProvider>
            </Provider>
          </GestureHandlerRootView>
          <Toast />
        </QueryClientProvider>
      )}
    </>
  );
};

export default AppLayout;
