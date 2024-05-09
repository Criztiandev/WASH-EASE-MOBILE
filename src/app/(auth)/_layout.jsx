import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/sign-in" />
      <Stack.Screen name="auth/sign-up" />
    </Stack>
  );
};

export default RootLayout;
