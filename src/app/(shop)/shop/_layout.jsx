import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="choosen" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
        }}
      />
      <Stack.Screen name="lists" />
      <Stack.Screen name="service" />
    </Stack>
  );
};

export default RootLayout;
