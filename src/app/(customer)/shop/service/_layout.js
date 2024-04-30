import React from "react";
import { Stack, useRouter } from "expo-router";
import Button from "../../../../components/atoms/Button";
import { Dimensions, Text, View } from "react-native";

const StackLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="self-service"
        options={{
          title: "",
          headerTitle: ({ data }) => (
            <View style={{ width: Dimensions.get("screen").width - 90 }}>
              <Text className="text-center text-[18px] font-bold">
                Self Service
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="pickup-deliver-service"
        options={{
          title: "",
          headerTitle: ({ data }) => (
            <View style={{ width: Dimensions.get("screen").width - 90 }}>
              <Text className="text-center text-[18px] font-bold">
                Pick up & Delivery
              </Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="success"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
