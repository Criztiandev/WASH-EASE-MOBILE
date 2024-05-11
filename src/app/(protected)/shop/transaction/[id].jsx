import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const HomeScreen = () => {
  return (
    <View className="px-2 space-y-4 mt-4">
      <Text className="text-[24px] text-center font-bold">
        Select Transaction Mode
      </Text>

      <TouchableOpacity
        className="px-4 py-2 border rounded-[5px] h-[100px] justify-center items-center"
        onPress={() => {
          router.push("/shop/service/self-service");
        }}>
        <Text className="text-[22px] font-bold text-center">Self Service</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="px-4 py-2 border rounded-[5px] h-[100px] justify-center items-center"
        onPress={() => router.push("/shop/service/full-service")}>
        <Text className="text-[22px] font-bold text-center">
          Pickup and Delivery
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="px-4 py-2 border rounded-[5px] h-[100px] justify-center items-center"
        onPress={() => router.push("/shop/service/full-service")}>
        <Text className="text-[22px] font-bold text-center">Pickup Only</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
