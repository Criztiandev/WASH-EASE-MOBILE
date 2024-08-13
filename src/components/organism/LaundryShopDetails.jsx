import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Icon } from "react-native-paper";
import Badge from "../atoms/Badge";
import { useRouter } from "expo-router";

import LaundryOne from "../../assets/images/laundry.jpg";
import LaundryTwo from "../../assets/images/laundry2.jpg";
import LaundryThree from "../../assets/images/laundry3.jpg";
import LaundryFour from "../../assets/images/laundry4.jpg";

const laundryImages = [LaundryOne, LaundryTwo, LaundryThree, LaundryFour];

const LaundryShopDetails = ({ id, name, address, phone_number }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-1"
      onPress={() => router.push(`/shop/details/${data.id}`)}
    >
      <View className=" flex-1  m-4 relative max-w-sm bg-white border border-gray-300 rounded-lg shadow">
        <Image
          source={
            laundryImages[Math.floor(Math.random() * laundryImages.length)]
          }
          contentFit="cover"
          transition={1000}
          className="h-[110px] rounded-t-md flex-1"
        />
        <View className="p-5 space-y-4">
          <Text className="font-bold capitalize text-3xl break-words">
            {name || "Shop name"}
          </Text>

          <View className="opacity-50 space-y-2 ">
            <View className="flex-row items-center ">
              <View className="mr-2">
                <Icon source={"information"} size={24} color="black" />
              </View>
              <Text className="text-[16px] capitalize break-all flex-shrink">
                {address}
              </Text>
            </View>

            <View className="flex-row items-center ">
              <View className="mr-2">
                <Icon source={"phone"} size={24} color="black" />
              </View>
              <Text className="text-[16px]">
                {phone_number || "Unavailable"}
              </Text>
            </View>
          </View>
        </View>

        <Badge>
          <Text className="text-md font-semibold text-green-900 capitalize">
            Status
          </Text>
        </Badge>
      </View>
    </TouchableOpacity>
  );
};

export default LaundryShopDetails;
