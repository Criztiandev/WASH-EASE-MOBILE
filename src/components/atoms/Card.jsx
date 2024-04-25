import { View, Text } from "react-native";
import React from "react";
import { cn } from "../../utils/dev.utils";

const Card = ({ children, ...props }) => {
  const defaultStyle = cn("p-5 space-y-4", props.className);
  return (
    <View className="flex-1 w-full p-2">
      <View className="flex-row relative bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
        <View className={defaultStyle}>{children}</View>
      </View>
    </View>
  );
};

export default Card;
