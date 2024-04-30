import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Avatar } from "react-native-paper";

const RootLayout = () => {
  // Use ID to fetch data of the owner
  const { id } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerTitle: () => (
            <View className="py-4 flex-row space-x-4 items-center">
              <Avatar.Icon size={48} icon="folder" />
              <View className="">
                <Text className="text-lg font-bold">
                  M&L Laundry Hub (Katuparan)
                </Text>
                <Text>Status</Text>
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default RootLayout;
