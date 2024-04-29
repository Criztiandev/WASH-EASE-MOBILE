import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "jotai";

const _layout = () => {
  return (
    <Provider>
      <PaperProvider>
        <Stack tack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(customer)" />
          <Stack.Screen name="(account)" />
        </Stack>
      </PaperProvider>
    </Provider>
  );
};

export default _layout;
