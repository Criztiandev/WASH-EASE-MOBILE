import { View, Text, ScrollView } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import { Avatar, IconButton } from "react-native-paper";

const ShopDetails = {
  name: "Shabu Houze",
  address: "Biringan Leyte",
  rating: 5.0,
  about:
    "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  opening: "5 AM - 6 PM",
  status: "Open",
};

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
                onPress={() => router.push(`./rider/${id}/message`)}
              />
              <IconButton
                icon={"information"}
                onPress={() => router.push(`./rider`)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RootScreen;
