import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import MapFrame from "../../../../../components/atoms/MapFrame";
import Button from "../../../../../components/atoms/Button";

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
      <ShopDetailsCover {...ShopDetails} />
      <View className="flex-1"></View>

      <View>
        <Button>
          <Text className="text-center items-center text-lg font-bold text-white">
            Message
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default RootScreen;
