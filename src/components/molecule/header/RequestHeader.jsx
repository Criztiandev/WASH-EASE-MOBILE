import { View, Text } from "react-native";
import React from "react";
import { Avatar, IconButton } from "react-native-paper";
import { router } from "expo-router";
import { Info, MessageCircle } from "lucide-react-native";

const RequestHeader = ({ id, name, status }) => {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center space-x-2">
        <Avatar.Icon />
        <View>
          <Text className="text-lg font-semibold">{name}</Text>
          <Text>{status}</Text>
        </View>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className="p-4 rounded-full"
          onPress={() => router.push(`/rider/message/${id}`)}
        >
          <MessageCircle color="black" fill="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 rounded-full"
          onPress={() => router.push(`/rider/message/${id}`)}
        >
          <Info color="black" fill="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestHeader;
