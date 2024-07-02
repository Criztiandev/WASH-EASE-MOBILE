import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import AuthContextProvider, { useAuthContext } from "../context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "jotai";
import useLocalStorage from "../hooks/useLocalStorage";
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
          <Provider>
            <PaperProvider >
              <AuthContextProvider>
                <RootStackNavigator />
              </AuthContextProvider>
            </PaperProvider>
          </Provider>
        </GestureHandlerRootView>
        <Toast />
      </QueryClientProvider>
    </>
  );
};

export default AppLayout;
