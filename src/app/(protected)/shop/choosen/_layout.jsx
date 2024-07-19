import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Icon, IconButton } from "react-native-paper";
import { Info, Star } from "lucide-react-native";

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
              className="p-2 rounded-full mr-2"
            >
              <Icon source={"arrow-left"} size={24} />
            </TouchableOpacity>
          ),

          headerRight: () => {
            const { id } = useLocalSearchParams();
            return (
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="p-4 rounded-full"
                  onPress={() => router.push(`/shop/choosen/review/${id}`)}
                >
                  <Star color="black" fill="black" />
                </TouchableOpacity>

                <TouchableOpacity
                  className="p-4 rounded-full"
                  onPress={() => router.push(`/shop/choosen/details/${id}`)}
                >
                  <Info color="white" fill="black" />
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full mr-2"
            >
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
              className="p-2 rounded-full mr-2"
            >
              <Icon source={"arrow-left"} size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default RootLayout;
