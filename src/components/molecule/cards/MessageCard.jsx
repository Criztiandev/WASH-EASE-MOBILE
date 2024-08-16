import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Badge, IconButton } from "react-native-paper";
import { router } from "expo-router";

const MessageCard = ({ path, userName, unreadCount, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center space-x-3   p-2 border-b border-gray-300/90">
        <IconButton
          icon="account"
          iconColor="#1e1e1e"
          size={48}
          className=" bg-primary/60 rounded-full "
        />
        <View>
          <Text className="text-[16px] font-bold">
            {userName?.substr(0, 25)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
