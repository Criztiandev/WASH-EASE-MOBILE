import { View } from "react-native";
import React from "react";
import { Avatar, Icon, Text } from "react-native-paper";

import LocationIcon from "../../../assets/icons/location_icon.svg";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/dev.utils";

import Button from "../../atoms/Button";

import { router } from "expo-router";
import { atom, useSetAtom } from "jotai";

const statusFlag = cva("right-0 m-2", {
  variants: {
    status: {
      open: "bg-green-300 border border-green-600",
      close: "bg-red-300 border border-red-600",
    },
  },
});

export const selectedCustomerAtom = atom(null);

const TaskDetailsCard = (props) => {
  const { id, fullName, address, phoneNumber, status } = props;
  const setSelectedAtom = useSetAtom(selectedCustomerAtom);
  const statusStyle = cn(statusFlag({ status }));

  const handleSelectCustomer = () => {
    setSelectedAtom(props);
    router.push(`/rider/task/dashboard/${id}`);
  };

  return (
    <View className=" flex-1  m-4 relative max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <View className="p-5 space-y-4">
        <View className="flex-row items-center space-x-2">
          <Avatar.Icon />
          <Text
            variant="titleLarge"
            className="font-bold"
            style={{ flexShrink: 1 }}
          >
            {fullName}
          </Text>
        </View>

        <View className="opacity-50 space-y-2">
          <View className="flex-row items-center " style={{ flexShrink: 1 }}>
            <View className="mr-2">
              <LocationIcon />
            </View>
            <Text className="text-[16px]" style={{ flexShrink: 1 }}>
              {address}
            </Text>
          </View>

          <View className="flex-row items-center " style={{ flexShrink: 1 }}>
            <View className="mr-2">
              <Icon source={"information"} size={24} />
            </View>
            <Text className="text-[16px]" style={{ flexShrink: 1 }}>
              {phoneNumber}
            </Text>
          </View>

          <View className="flex-row items-center ">
            <View className="mr-2">
              <Icon source={"information"} size={24} />
            </View>
            <Text className="text-[16px]">{status}</Text>
          </View>
        </View>

        <Button onPress={handleSelectCustomer}>View Details</Button>
      </View>
    </View>
  );
};

export default TaskDetailsCard;
