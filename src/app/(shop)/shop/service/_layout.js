import React from "react";
import { Stack, useRouter } from "expo-router";
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
        name="full-service"
        options={{
          title: "",
          headerTitle: ({ data }) => (
            <View style={{ width: Dimensions.get("screen").width - 90 }}>
              <Text className="text-center text-[18px] font-bold">
                Full service
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
