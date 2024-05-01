import React from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Transaction",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
