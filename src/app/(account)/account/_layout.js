import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayoutScreen = () => {
  return (
    <Stack>
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
        }}
      />

      <Stack.Screen
        name="notification"
        options={{
          title: "Notification",
        }}
      />

      <Stack.Screen
        name="transaction"
        options={{
          title: "Transactions",
        }}
      />
    </Stack>
  );
};

export default RootLayoutScreen;
