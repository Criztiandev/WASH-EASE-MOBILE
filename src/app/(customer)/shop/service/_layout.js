import React from "react";
import { Stack, useRouter } from "expo-router";
import Button from "../../../../components/atoms/Button";
import { Text } from "react-native";

const StackLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="self-service"
        options={{
          title: "Self Service",
        }}
      />

      <Stack.Screen
        name="success"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
