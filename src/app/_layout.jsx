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

const RootStackNavigator = () => {
  const { setAuthState } = useAuthContext();
  const { getData } = useLocalStorage("auth");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getData();

      if (result && result.isAuthenticated) {
        const currentRole = result?.role.toLowerCase();
        router.replace(`${currentRole}/home`);
      }
    })();
  }, [getData]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

const AppLayout = () => {
  const { getData } = useLocalStorage("splash");
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(false);

  useEffect(() => {
    const checkIsAlreadySplashScreen = async () => {
      const payload = await getData();

      if (payload?.isAlreadySplashed) {
        setIsShowSplashScreen(false);
      } else {
        setIsShowSplashScreen(true);
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
