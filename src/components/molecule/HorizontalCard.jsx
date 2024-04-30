import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

const HorizontalCard = ({ image, description, title }) => {
  return (
    <View className="flex-row relative space-x- bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <View style={{ width: "35%" }}>
        <Image
          source={image}
          contentFit="cover"
          transition={1000}
          className=" rounded-t-md flex-1"
        />
      </View>
      <View className="space-y-2 p-4 " style={{ flexShrink: 1 }}>
        <Text className="text-xl font-bold">{title}</Text>

        <View className="opacity-50 space-y-2 ">
          <Text className="">{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default HorizontalCard;
