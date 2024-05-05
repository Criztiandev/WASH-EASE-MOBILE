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
    </Stack>
  );
};

export default RootLayoutScreen;
