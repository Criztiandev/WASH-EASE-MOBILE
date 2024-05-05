import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { router } from "expo-router";

import Badge from "../atoms/Badge";
import { cn } from "../../utils/dev.utils";
import { cva } from "class-variance-authority";

const statusFlag = cva("left-0 m-2", {
  variants: {
    status: {
      open: "bg-green-300 border border-green-600",
      close: "bg-red-300 border border-red-600",
    },
  },
});

const LaundryShopCardVertical = ({ image, title, path, children, status }) => {
  const statusStyle = cn(statusFlag({ status }));
  const handleNavigate = () => {
    router.push(path);
  };

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View className="flex-row relative bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
        <View className="w-[40%]">
          <Image
            source={image}
            contentFit="cover"
            transition={1000}
            className=" rounded-t-md flex-1"
          />
        </View>
        <View className="p-4">
          <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </Text>

          <View className="opacity-50 space-y-2">{children}</View>
        </View>

        {status && (
          <Badge className={statusStyle}>
            <Text className="text-md font-semibold text-green-900 capitalize">
              {status}
            </Text>
          </Badge>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LaundryShopCardVertical;
