import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Icon } from "react-native-paper";
import Toast from "react-native-toast-message";

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
                onPress={() => {
                  try {
                    router.back();
                  } catch (e) {
                    Toast.show({
                      type: "error",
                      text1: "Failed to complete the delivery",
                    });
                  }
                }}
                className="p-2 rounded-full mr-2"
              >
                <Icon source={"arrow-left"} size={24} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="rider-details"
        options={{
          title: "Details",
          headerLeft: () => (
            <View className="flex-row space-x-4 items-center">
              <TouchableOpacity
                onPress={() => {
                  try {
                    router.back();
                  } catch (e) {
                    Toast.show({
                      type: "error",
                      text1: "Failed to complete the delivery",
                    });
                  }
                }}
                className="p-2 rounded-full mr-2"
              >
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
                className="p-2 rounded-full mr-2"
              >
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
                className="p-2 rounded-full mr-2"
              >
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
