import { View, Text } from "react-native";
import React from "react";
import { Avatar, IconButton } from "react-native-paper";
import { router } from "expo-router";

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
        <IconButton
          icon={"message"}
          onPress={() => router.push(`/rider/message/${id}`)}
        />

        <IconButton
          icon={"information"}
          onPress={() => router.push(`../order-details/${id}}`)}
        />
      </View>
    </View>
  );
};

export default RequestHeader;
