import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Check } from "lucide-react-native";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="choosen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="dashboard" />
      <Stack.Screen
        name="details/[id]"
        options={{
          title: "Details",
        }}
      />
      <Stack.Screen name="lists" />
      <Stack.Screen name="service" options={{ title: "Transaction Mode" }} />
    </Stack>
  );
};

export default RootLayout;
