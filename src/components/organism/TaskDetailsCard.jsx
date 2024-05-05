import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Avatar, Icon } from "react-native-paper";
import { router } from "expo-router";

const TaskDetailsCard = ({ id, fullName, address, phoneNumber, status }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/rider/customer/message/${id}`);
      }}>
      <View className="flex-row items-start space-x-3   p-2 border-b border-gray-300/90">
        <Text>{id + 1}</Text>
        <Avatar.Icon />
        <View className="space-y-2 mt-4">
          <Text className="text-[18px] font-bold">{fullName} </Text>
          <View
            style={{ flexShrink: 1 }}
            className="flex-row space-x-2 items-center ">
            <Icon source={"information"} size={24} />
            <Text
              style={{
                flexShrink: 1,
                flexWrap: "wrap",
                width: Dimensions.get("screen").width - 130,
              }}
              className="">
              {address}
            </Text>
          </View>

          <View
            style={{ flexShrink: 1 }}
            className="flex-row space-x-2 items-center ">
            <Icon source={"information"} size={24} />
            <Text
              style={{
                flexShrink: 1,
                flexWrap: "wrap",
                width: Dimensions.get("screen").width - 130,
              }}
              className="">
              {phoneNumber}
            </Text>
          </View>

          <View className="flex flex-row items-center space-x-2">
            <Icon source={"information"} size={24} />
            <View
              style={{ flexShrink: 1 }}
              className="flex-row space-x-2 items-center px-4 py-2 rounded-full  max-w-[150px] bg-orange-300 ">
              <Text
                style={{
                  flexShrink: 1,
                  flexWrap: "wrap",
                  width: Dimensions.get("screen").width - 130,
                }}
                className="text-center text-gray-600">
                {status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskDetailsCard;
