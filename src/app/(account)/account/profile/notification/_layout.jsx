import React from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Notification",
          headerTitle: () => (
            <Text className="text-lg font-bold border flex-1">
              Notification
            </Text>
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
