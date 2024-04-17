import React from "react";
import { View, Text } from "react-native";

const AbouTab = () => {
  return (
    <View
      className="p-4 h-full space-y-4"
      style={{ backgroundColor: "#E7E8E6" }}>
      <View className=" p-4 bg-white">
        <Text className="mb-2 font-semibold text-[18px]">About Us</Text>
        <Text>
          A laundry shop that offers affordable and quality laundry services!
        </Text>
      </View>

      <View className="h-[150px] border rounded-[5px]"></View>

      <View className=" p-4 bg-white">
        <Text className="mb-2 font-semibold text-[18px]">Address</Text>
        <Text>
          88 3rd Street GHQ Village Katuparan 1630 Taguig, Philippines
        </Text>
      </View>

      <View className=" p-4 bg-white">
        <Text className="mb-2 font-semibold text-[18px]">Opening Hours</Text>
        <Text>Mon - Saturday : 8:00 AM to 8:00 PM</Text>
      </View>
    </View>
  );
};

export default AbouTab;
