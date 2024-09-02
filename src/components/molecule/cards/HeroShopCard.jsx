import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Icon } from "react-native-paper";

import LocationIcon from "../../../assets/icons/location_icon.svg";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/dev.utils";

import Button from "../../atoms/Button";

import LaundryOne from "../../../assets/images/laundry.jpg";
import LaundryTwo from "../../../assets/images/laundry2.jpg";
import LaundryThree from "../../../assets/images/laundry3.jpg";
import LaundryFour from "../../../assets/images/laundry4.jpg";

const laundryImages = [LaundryOne, LaundryTwo, LaundryThree, LaundryFour];

const HeroShopCard = ({
  image = Math.floor(Math.random() * laundryImages.length),
  title,
  details,
  label,
  isOpen,
  onNavigate,
  ...props
}) => {
  return (
    <View className=" flex-1  m-4 relative max-w-sm bg-white border border-gray-300 rounded-lg shadow">
      {isOpen && (
        <View
          className={cn(
            `absolute top-0 right-0 m-2 z-50  px-6 py-1 rounded-full border ${
              isOpen === "Open"
                ? "bg-green-400 border-green-300"
                : "bg-red-400 border-red-300"
            } `
          )}
        >
          <Text
            className={cn(`${isOpen === "Open" ? "text-black" : "text-white"}`)}
          >
            {isOpen}
          </Text>
        </View>
      )}
      <Image
        source={laundryImages[image]}
        contentFit="cover"
        transition={1000}
        className="h-[110px] rounded-t-md flex-1"
      />
      <View className="p-5 space-y-4">
        <Text className="font-bold capitalize text-3xl">{title}</Text>

        <View className="opacity-50 space-y-2 ">
          <View className="flex-row items-center ">
            <View className="mr-2">
              <LocationIcon />
            </View>
            <Text className="text-[16px] capitalize flex-shrink break-all">
              {details?.location}
            </Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px]">
              {details?.schedule || "8:00 AM - 5:00 PM"}
            </Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px]">{details?.contact || "N/A"}</Text>
          </View>
        </View>

        {label && <Button onPress={onNavigate}>{label}</Button>}
      </View>
    </View>
  );
};

export default HeroShopCard;
