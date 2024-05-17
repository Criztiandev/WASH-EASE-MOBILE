import { View, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Icon, Text } from "react-native-paper";

import LocationIcon from "../../../assets/icons/location_icon.svg";
import ClockIcon from "../../../assets/icons/clock_icon.svg";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/dev.utils";
import Badge from "../../atoms/Badge";

import Button from "../../atoms/Button";
import { router } from "expo-router";
const statusFlag = cva("right-0 m-2", {
  variants: {
    status: {
      open: "bg-green-300 border border-green-600",
      close: "bg-red-300 border border-red-600",
    },
  },
});

const HeroShopCard = ({ image, title, details, status, label, onNavigate }) => {
  const statusStyle = cn(statusFlag({ status }));

  return (
    <View className=" flex-1  m-4 relative max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <Image
        source={image}
        contentFit="cover"
        transition={1000}
        className="h-[110px] rounded-t-md flex-1"
      />
      <View className="p-5 space-y-4">
        <Text variant="titleLarge" className="font-bold">
          {title}
        </Text>

        <View className="opacity-50 space-y-2 ">
          <View className="flex-row items-center ">
            <View className="mr-2">
              <LocationIcon />
            </View>
            <Text className="text-[16px]">{details.location}</Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} />
            </View>
            <Text className="text-[16px]">{details.schedule}</Text>
          </View>
        </View>

        {label && <Button onPress={onNavigate}>{label}</Button>}
      </View>

      <Badge className={statusStyle}>
        <Text className="text-md font-semibold text-green-900 capitalize">
          {status}
        </Text>
      </Badge>
    </View>
  );
};

export default HeroShopCard;
