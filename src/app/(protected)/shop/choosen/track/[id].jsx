import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import { Avatar } from "react-native-paper";
import { Info, MessageCircle } from "lucide-react-native";

const RootScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <View className="flex-1 border"></View>
      <View className="">
        <View className="p-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center space-x-2">
              <Avatar.Icon />
              <View>
                <Text className="text-lg font-semibold">Gerard Arcones</Text>
                <Text>Delivery Rider</Text>
              </View>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="p-4 rounded-full"
                onPress={() => router.push(`/rider/message/${id}`)}
              >
                <MessageCircle color="black" fill="black" />
              </TouchableOpacity>

              <TouchableOpacity
                className="p-4 rounded-full"
                onPress={() => router.push(`/rider/message/${id}`)}
              >
                <Info color="black" fill="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RootScreen;
