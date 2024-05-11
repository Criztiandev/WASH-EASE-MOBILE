import { View, Text } from "react-native";
import React, { useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

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
              Toast.show({
                type: "success",
                text1: "Selected Successfully",
              });

              router.push(`/shop/transaction/${id}`);
            };

            return (
              <View className="flex-row space-x-2">
                <IconButton icon={"check"} onPress={handleSelect} />
              </View>
            );
          },
        }}
      />
      <Stack.Screen name="lists" />
      <Stack.Screen name="service" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
