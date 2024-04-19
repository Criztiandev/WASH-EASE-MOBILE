import { View, Text, Dimensions } from "react-native";
import React from "react";
import StarRating from "../../assets/icons/start_fill_icon.svg";
import { Image } from "expo-image";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import { Link, router, useNavigation } from "expo-router";
import CloseIcon from "../../assets/icons/close_icon.svg";

const ShopDetailsCover = () => {
  return (
    <View className="relative">
      <Image
        source={
          "https://images.pexels.com/photos/13696491/pexels-photo-13696491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        contentFit="cover"
        transition={1000}
        className="h-[250px] rounded-t-md relative -z-30"
      />

      <View
        className="space-y-2 absolute bg-black/50 h-[250px]"
        style={{ width: Dimensions.get("screen").width }}>
        <View className="absolute bottom-0 m-4">
          <View className="space-y-1">
            <Text className="text-[22px] font-bold underline text-white">
              M&L Laundry Hub (KATUPARAN)
            </Text>
            <Text className="text-white">Barangay kahit san</Text>
          </View>

          <View className="flex-row items-center ">
            <View className="space-x-1 flex-row">
              <StarRating />
              <StarRating />
              <StarRating />
              <StarRating />
              <StarRating />
            </View>
            <Text className="font-bold text-[16px] text-white">
              (5 Reviews)
            </Text>
          </View>
        </View>

        <Link
          href={"../../home"}
          className="absolute right-0 bg-white rounded-full mx-2 p-2 justify-center items-center">
          <CloseIcon />
        </Link>

        <Badge className="bg-green-300 m-2">
          <Text>Open</Text>
        </Badge>
      </View>
    </View>
  );
};

export default ShopDetailsCover;
