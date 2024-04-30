import { View, Text } from "react-native";
import React from "react";
import Divider from "../../../atoms/Divider";

const TotalSection = ({ subtotal, total }) => {
  return (
    <>
      <View className="py-4 space-y-4">
        <View className="flex-row justify-between items-start">
          <Text className="font-bold ">Subtotal</Text>
          <Text className="font-bold ">P {subtotal}</Text>
        </View>
        <View className="flex-row justify-between items-start sa">
          <Text className="font-semibold  opacity-50">Tax</Text>
          <Text className="font-bold  ">P 0</Text>
        </View>
      </View>

      <Divider />

      <View className="flex-row justify-between items-start my-4">
        <Text className="font-bold ">Total</Text>
        <Text className="font-bold ">P {total}</Text>
      </View>
    </>
  );
};

export default TotalSection;
