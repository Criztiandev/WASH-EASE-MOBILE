import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Icon, IconButton } from "react-native-paper";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="request"
        options={{
          title: "Laundry Details",
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
                <IconButton
                  icon="star"
                  onPress={() => router.push(`/shop/choosen/review/${id}`)}
                />

                <IconButton
                  icon="information"
                  onPress={() => router.push(`/shop/choosen/details/${id}`)}
                />
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name="order-details"
        options={{
          title: "Order Details",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full mr-2">
              <Icon source={"arrow-left"} size={24} />
            </TouchableOpacity>
          ),
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
      <Stack.Screen
        name="review"
        options={{
          title: "Review",
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
