import { View, Text } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="choosen" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerRight: () => (
            <View className="flex-row space-x-2">
              <IconButton
                icon={"message"}
                onPress={() => router.push(`/shop/choosen/message/${123}`)}
              />
              <IconButton
                icon={"check"}
                onPress={() =>
                  Toast.show({
                    type: "success",
                    text1: "Selected Successfully",
                  })
                }
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="lists" />
      <Stack.Screen name="service" />
    </Stack>
  );
};

export default RootLayout;
