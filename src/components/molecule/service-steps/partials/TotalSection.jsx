import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Divider from "../../../atoms/Divider";

const TotalSection = ({ payload }) => {
  const taxRate = 0.1;
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const expectedService = [
    "basic-service",
    "basic-ironing",
    "basic-drycleaning",
  ];
  const exptectedQuanity = ["basic-material"];

  useEffect(() => {
    const serviceSubTotal = expectedService.reduce((acc, service) => {
      if (!payload[service]) return acc; // Continue the accumulation without changing if no data for the service

      const innerTotal = payload[service].reduce((innerAcc, item) => {
        return innerAcc + parseFloat(item.price); // Ensure price is a number
      }, 0);
      return acc + innerTotal;
    }, 0);

    const quantitySubtotal = exptectedQuanity.reduce((acc, quantity) => {
      if (!payload[quantity]) return acc; // Continue the accumulation without changing if no data for the service

      const innerTotal = payload[quantity]?.reduce((innerAcc, item) => {
        const result = item.price * item.quantity;
        return innerAcc + result;
      }, 0);

      return acc + innerTotal;
    }, 0);

    const newSubtotal = quantitySubtotal + serviceSubTotal;
    const newTotal = newSubtotal + (1 + taxRate);
    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }, []);

  return (
    <>
      <View className="p-4 space-y-4">
        <View className="flex-row justify-between items-start">
          <Text className="font-bold ">Subtotal</Text>
          <Text className="font-bold ">₱ {subtotal}</Text>
        </View>
        <View className="flex-row justify-between items-start sa">
          <Text className="font-semibold  opacity-50">Tax</Text>
          <Text className="font-bold  ">₱ {taxRate}</Text>
        </View>
      </View>

      <Divider />

      <View className="px-4 flex-row justify-between items-start my-4">
        <Text className="font-bold ">Total</Text>
        <Text className="font-bold ">₱ {total.toFixed(2)}</Text>
      </View>
    </>
  );
};

export default TotalSection;
