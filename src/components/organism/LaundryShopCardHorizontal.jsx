import { View, Dimensions } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Link } from "expo-router";
import { Text } from "react-native-paper";

import LocationIcon from "../../assets/icons/location_icon.svg";
import ClockIcon from "../../assets/icons/clock_icon.svg";
import Badge from "../atoms/Badge";
import { cn } from "../../utils/dev.utils";
import { cva } from "class-variance-authority";
import Button from "../atoms/Button";

const statusFlag = cva("right-0 m-2", {
  variants: {
    status: {
      open: "bg-green-300 border border-green-600",
      close: "bg-red-300 border border-red-600",
    },
  },
});

const LaundryShopCard = ({ image, title, id, details, status }) => {
  const statusStyle = cn(statusFlag({ status }));

  return (
    <View
      style={{
        width: Dimensions.get("screen").width - 64,
      }}
      className="relative max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <Image
        source={image}
        contentFit="cover"
        transition={1000}
        className="h-[120px] rounded-t-md flex-1 "
      />
      <View className="p-5 space-y-2">
        <Text variant="titleLarge" className="font-bold">
          {title}
        </Text>

        <View className="opacity-50 space-y-2 flex-row space-x-4">
          <View className="space-x-2 flex-row items-center">
            <LocationIcon className="text-gray-400" />
            <Text className="text-[16px]">{details.location}</Text>
          </View>

          <View className="space-x-2 flex-row items-center">
            <ClockIcon />
            <Text className="text-[16px]">{details.schedule}</Text>
          </View>
        </View>
      </View>

      <View className="px-4">
        <Button>
          <Link href={`../shop/details/${id}`} asChild>
            <Text
              variant="bodyLarge"
              className="text-center font-semibold text-white">
              View details
            </Text>
          </Link>
        </Button>
      </View>

      <Badge className={statusStyle}>
        <Text className="text-md font-semibold text-green-900 capitalize">
          {status}
        </Text>
      </Badge>
    </View>
  );
};

export default LaundryShopCard;
