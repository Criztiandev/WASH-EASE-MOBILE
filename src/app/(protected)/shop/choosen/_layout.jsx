import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Icon } from "react-native-paper";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="request"
        options={{
          title: "Request",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full mr-2">
              <Icon source={"arrow-left"} size={24} />
            </TouchableOpacity>
          ),

          headerRight: () => {
            const { id } = useLocalSearchParams();
            return (
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => router.push(`/shop/choosen/message/${id}`)}
                  className="p-2 rounded-full mr-2">
                  <Icon source={"message"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push(`/shop/choosen/details/${id}`)}
                  className="p-2 rounded-full mr-2">
                  <Icon source={"information"} size={24} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name="order-details"
        options={{
          title: "Order Details",
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: "Details",
        }}
      />

      <Stack.Screen
        name="message"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
