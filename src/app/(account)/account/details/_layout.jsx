import { TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Icon } from "react-native-paper";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Account",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full mr-2">
              <Icon source={"arrow-left"} size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default RootLayout;
