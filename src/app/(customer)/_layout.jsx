import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="customer/(tabs)" />
      <Stack.Screen name="customer/message" />
    </Stack>
  );
};

export default RootLayout;
