import { View, Text, Dimensions } from "react-native";
import React from "react";
import StarRating from "../../assets/icons/start_fill_icon.svg";
import { Image } from "expo-image";
import Badge from "../atoms/Badge";

const ShopDetailsCover = ({
  title,
  address,
  details,
  rating,
  stars,
  status,
}) => {
  return (
    <View className="relative  p-0">
      <Image
        source={
          "https://images.pexels.com/photos/13696491/pexels-photo-13696491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        contentFit="cover"
        transition={1000}
        className="h-[250px]  -z-30"
      />

      <View
        className="space-y-2 absolute bg-black/50 h-[250px]"
        style={{ width: Dimensions.get("screen").width }}>
        <View className="absolute bottom-0 m-4">
          <View className="space-y-1">
            <Text className="text-[22px] font-bold underline text-white">
              {title}
            </Text>
            <Text className="text-white">{address}</Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <View className="space-x-1 flex-row">
              <StarRating />
              <StarRating />
              <StarRating />
              <StarRating />
              <StarRating />
            </View>
            <Text className="font-bold text-[16px] text-white">({rating})</Text>
          </View>
        </View>

        <Badge className="bg-green-300 m-2">
          <Text>{status}</Text>
        </Badge>
      </View>
    </View>
  );
};

export default ShopDetailsCover;
