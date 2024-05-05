import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Avatar, Icon } from "react-native-paper";

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
            <View className="flex-row space-x-4 items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2 rounded-full mr-2">
                <Icon source={"arrow-left"} size={24} />
              </TouchableOpacity>

              <View className="py-4 flex-row space-x-4 items-center">
                <Avatar.Icon size={48} icon="folder" />
                <View className="">
                  <Text className="text-lg font-bold">Rider of the Night</Text>
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
