import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

const HorizontalCard = ({ image, description, title }) => {
  return (
    <View className="flex-row relative max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <View className="w-[35%]">
        <Image
          source={image}
          contentFit="cover"
          transition={1000}
          className=" rounded-t-md flex-1"
        />
      </View>
      <View className="p-5 space-y-4 ">
        <Text className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </Text>

        <View className="opacity-50 space-y-2 ">
          <Text className="text-[16px] text-base">{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default HorizontalCard;
