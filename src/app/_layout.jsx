import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "jotai";
import Toast from "react-native-toast-message";

const _layout = () => {
  return (
    <>
      <Provider>
        <PaperProvider>
          <Stack tack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(customer)" />
            <Stack.Screen name="(account)" />
          </Stack>
        </PaperProvider>
      </Provider>
      <Toast />
    </>
  );
};

export default _layout;
