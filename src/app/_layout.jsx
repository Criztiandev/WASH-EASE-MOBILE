import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import AuthContextProvider from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "jotai";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

const RootStackNavigator = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

const AppLayout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
            <Provider>
              <AuthContextProvider>
                <RootStackNavigator />
              </AuthContextProvider>
            </Provider>
          </PaperProvider>
        </GestureHandlerRootView>
        <Toast />
      </QueryClientProvider>
    </>
  );
};

export default AppLayout;
