import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Icon } from "react-native-paper";

import Badge from "../../atoms/Badge";

import Button from "../../atoms/Button";
import LaundryOne from "../../../assets/images/laundry.jpg";
import LaundryTwo from "../../../assets/images/laundry2.jpg";
import LaundryThree from "../../../assets/images/laundry3.jpg";
import LaundryFour from "../../../assets/images/laundry4.jpg";

const laundryImages = [LaundryOne, LaundryTwo, LaundryThree, LaundryFour];

const TransactionCard = ({
  shopName,
  address,
  contact,
  onNavigate,
  ...props
}) => {
  return (
    <View className=" flex-1  m-4 relative max-w-sm bg-white border border-gray-300 rounded-lg shadow">
      <Image
        source={laundryImages[Math.floor(Math.random() * laundryImages.length)]}
        contentFit="cover"
        transition={1000}
        className="h-[110px] rounded-t-md flex-1"
      />
      <View className="p-5 space-y-4">
        <Text className="font-bold capitalize text-3xl">{shopName}</Text>

        <View className="opacity-50 space-y-2 ">
          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px] flex-shrink break-all">{address}</Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px] capitalize">
              {props?.service_type?.split("_")?.join(" ") || "Service Name"}
            </Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px]">{props.total_bill}</Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px]">{props.status}</Text>
          </View>
        </View>

        <Button onPress={onNavigate} disabled={props.status === "PENDING"}>
          View Details
        </Button>

        {/* {props?.service_type === "pickup_and_delivery" ? (
         
        ) : (
          <></>
        )} */}
      </View>
    </View>
  );
};

export default TransactionCard;
