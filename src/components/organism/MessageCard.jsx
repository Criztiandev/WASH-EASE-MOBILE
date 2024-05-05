import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Badge } from "react-native-paper";
import { router } from "expo-router";

const MessageCard = ({ userName, lastMessageSent, unreadCount }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/rider/message/123123");
      }}>
      <View className="flex-row items-center space-x-3   p-2 border-b border-gray-300/90">
        <Avatar.Icon />
        <View>
          <Text className="text-[16px] font-bold">
            {userName.substr(0, 25)}
          </Text>
          <Text className="text-[16px] opacity-50">
            {lastMessageSent.substr(0, 30)}....
          </Text>
        </View>
      </View>
      <Badge className={"absolute right-2 top-2"}>{unreadCount}</Badge>
    </TouchableOpacity>
  );
};

export default MessageCard;
