import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import { Avatar, IconButton } from "react-native-paper";

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
              <IconButton
                icon={"message"}
                onPress={() => router.push(`/rider/message/${id}`)}
              />
              <IconButton
                icon={"information"}
                onPress={() => router.push(`../order-details/${id}}`)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RootScreen;
