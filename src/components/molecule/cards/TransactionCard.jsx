import { View, Dimensions, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Icon } from "react-native-paper";

import LocationIcon from "../../../assets/icons/location_icon.svg";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/dev.utils";
import Badge from "../../atoms/Badge";

import Button from "../../atoms/Button";
const statusFlag = cva("right-0 m-2", {
  variants: {
    status: {
      open: "bg-green-300 border border-green-600",
      close: "bg-red-300 border border-red-600",
    },
  },
});

const TransactionCard = ({ onNavigate, ...props }) => {
  console.log(props);
  return (
    <View className=" flex-1  m-4 relative max-w-sm bg-white border border-gray-300 rounded-lg shadow">
      <Image
        source={
          "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        contentFit="cover"
        transition={1000}
        className="h-[110px] rounded-t-md flex-1"
      />
      <View className="p-5 space-y-4">
        <Text className="font-bold capitalize text-3xl">
          {props?.service_type?.split("_")?.join(" ") || "Service Name"}
        </Text>

        <View className="opacity-50 space-y-2 ">
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
            <Text className="text-[16px]">{props?.payment_method}</Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px]">{props.payment_status}</Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} color="black" />
            </View>
            <Text className="text-[16px]">{props.status}</Text>
          </View>
        </View>

        <Button onPress={onNavigate}>View Details</Button>
      </View>

      <Badge>
        <Text className="text-md font-semibold text-green-900 capitalize">
          Pending
        </Text>
      </Badge>
    </View>
  );
};

export default TransactionCard;
