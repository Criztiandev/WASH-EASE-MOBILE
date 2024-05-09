import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default RootLayout;
