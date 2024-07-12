import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Badge } from "react-native-paper";
import { router } from "expo-router";

const MessageCard = ({ path, userName, lastMessageSent, unreadCount }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(path);
      }}
    >
      <View className="flex-row items-center space-x-3   p-2 border-b border-gray-300/90">
        <Avatar.Icon className="bg-purple-800" />
        <View>
          <Text className="text-[16px] font-bold">
            {userName?.substr(0, 25)}
          </Text>
          <Text className="text-[16px] opacity-50">
            {lastMessageSent?.substr(0, 30)}....
          </Text>
        </View>
      </View>
      <Badge className={"absolute right-2 top-2 bg-red-500"}>
        {unreadCount}
      </Badge>
    </TouchableOpacity>
  );
};

export default MessageCard;
