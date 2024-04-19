import { View, Text } from "react-native";
import React from "react";

const AboutTab = () => {
  return (
    <View className="flex-1 bg-[#E7E8E6] p-4 space-y-4">
      <View className="bg-white p-4">
        <Text className="text-[18px] font-bold mb-2">About Us</Text>
        <Text className="text-[16px]">
          A laundry shop that offers affordable and quality laundry services!
        </Text>
      </View>

      <View className="bg-white p-4">
        <Text className="text-[18px] font-bold mb-2">Address</Text>
        <Text className="text-[16px] opacity-60">
          88 3rd Street GHQ Village Katuparan 1630 Taguig, Philippines
        </Text>
      </View>

      <View className="bg-white p-4">
        <Text className="text-[18px] font-bold mb-2">Opening Hourse</Text>
        <Text className="text-[16px] opacity-60">
          Mon - Saturday : 8:00 AM to 8:00 PM
        </Text>
      </View>
    </View>
  );
};

export default AboutTab;
