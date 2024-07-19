import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Avatar } from "react-native-paper";
import { ArrowLeft } from "lucide-react-native";

const RootLayout = () => {
  // Use ID to fetch data of the owner
  const { id } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerLeft: () => (
            <View className="flex-row items-center">
              <TouchableOpacity
                className="p-4 rounded-full"
                onPress={() => router.back()}
              >
                <ArrowLeft color="black" fill="black" />
              </TouchableOpacity>

              <View className="py-4 flex-row space-x-4 items-center">
                <Avatar.Icon size={48} icon="folder" />
                <View className="">
                  <Text className="text-lg font-bold">
                    M&L Laundry Hub (Katuparan)
                  </Text>
                  <Text>Status</Text>
                </View>
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default RootLayout;
