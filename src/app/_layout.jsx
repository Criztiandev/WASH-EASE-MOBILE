import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const _layout = () => {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(customer)" />
        <Stack.Screen name="(account)" />
      </Stack>
    </PaperProvider>
  );
};

export default _layout;
