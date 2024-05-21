import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Icon } from "react-native-paper";

const ShopServiceDetailCard = ({
  onToggle,
  id,
  cover,
  title,
  price,
  timer,
  description,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className="border border-gray-300  min-h-[100px] mx-4 mt-4 rounded-[5px] bg-white overflow-hidden">
      <View className="flex-row flex-1">
        <View className="space-y-1 p-4">
          <Text className="text-[18px] font-bold">{title || "N/A"}</Text>
          <Text className="text-[18px] font-bold">₱ {price || 0}</Text>

          {timer && (
            <View className="flex-row items-center space-x-2 opacity-50">
              <Icon source={"clock"} size={16} />
              <Text className="text-md">{timer} minutes</Text>
            </View>
          )}

          {description && (
            <View
              className="flex-row space-x-2 opacity-50"
              style={{ flexShrink: 2, width: 175 }}>
              <Icon source={"weight"} size={16} />

              <Text
                style={{
                  flexShrink: 1,
                  width: Dimensions.get("screen").width - 200,
                }}>
                {description}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopServiceDetailCard;
