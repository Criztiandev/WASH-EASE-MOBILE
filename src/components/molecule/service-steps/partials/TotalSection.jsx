import { View, Text } from "react-native";
import React, { useState } from "react";
import Divider from "../../../atoms/Divider";

const TotalSection = () => {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  return (
    <>
      <View className="p-4 space-y-4">
        <View className="flex-row justify-between items-start">
          <Text className="font-bold ">Subtotal</Text>
          <Text className="font-bold ">₱ {subtotal}</Text>
        </View>
        <View className="flex-row justify-between items-start sa">
          <Text className="font-semibold  opacity-50">Tax</Text>
          <Text className="font-bold  ">₱ 0</Text>
        </View>
      </View>

      <Divider />

      <View className="px-4 flex-row justify-between items-start my-4">
        <Text className="font-bold ">Total</Text>
        <Text className="font-bold ">₱ {total}</Text>
      </View>
    </>
  );
};

export default TotalSection;
