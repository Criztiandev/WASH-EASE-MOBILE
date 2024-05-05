import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Icon } from "react-native-paper";

const RootLayoutScreen = () => {
  return (
    <Stack>
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerLeft: () => (
            <View className="flex-row space-x-4 items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2 rounded-full mr-2">
                <Icon source={"arrow-left"} size={24} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="notification"
        options={{
          title: "Notification",
          headerLeft: () => (
            <View className="flex-row space-x-4 items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2 rounded-full mr-2">
                <Icon source={"arrow-left"} size={24} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="transaction"
        options={{
          title: "Transactions",
          headerLeft: () => (
            <View className="flex-row space-x-4 items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2 rounded-full mr-2">
                <Icon source={"arrow-left"} size={24} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default RootLayoutScreen;
