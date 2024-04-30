import { View, Text, ScrollView } from "react-native";
import React from "react";

const AboutTab = ({
  about = "No about details available",
  address = "No Address available",
  opening = "No Opening hour available",
}) => {
  return (
    <ScrollView className="">
      <View className="p-4 mb-2 space-y-4">
        <View className="bg-white p-4 rounded-[5px] border border-gray-200">
          <Text className="text-[18px] font-bold mb-2">About Us</Text>
          <Text className="text-[16px]">{about}</Text>
        </View>

        <View className="bg-white p-4 rounded-[5px] border border-gray-200">
          <Text className="text-[18px] font-bold mb-2 rounded-[5px]">
            Address
          </Text>
          <Text className="text-[16px] opacity-60">{address}</Text>
        </View>

        <View className="bg-white p-4 rounded-[5px] border border-gray-200">
          <Text className="text-[18px] font-bold mb-2">Opening Hours</Text>
          <Text className="text-[16px] opacity-60">{opening}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutTab;
