import { View, Text } from "react-native";
import React from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import { Avatar } from "react-native-paper";
import MapView from "react-native-maps";

const RootScreen = () => {
  return (
    <ScreenLayout>
      <View className="py-4 flex-row space-x-4 items-center px-4">
        <Avatar.Icon size={48} icon="folder" />
        <View className="">
          <Text className="text-lg font-bold">Rider of the Night</Text>
          <Text>Status</Text>
        </View>
      </View>

      <View className="flex-1 border">
        <MapView className="w-full h-full" />
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
