import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Check } from "lucide-react-native";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="choosen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="dashboard" />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerRight: () => {
            const { id } = useLocalSearchParams();

            const handleSelect = () => {
              router.push(`/shop/transaction/${id}`);
            };

            return (
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  className="rounded-full p-4"
                  onPress={handleSelect}
                >
                  <Check color="black" />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Stack.Screen name="lists" />
      <Stack.Screen name="service" options={{ title: "Transaction Mode" }} />
    </Stack>
  );
};

export default RootLayout;
