import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Divider from "../../atoms/Divider";
import { useSetAtom } from "jotai";
import { serviceAtom } from "../../../service/states/service.atoms";

const TotalSection = ({ form, payload }) => {
  const [total, setTotal] = useState(0);
  const setServiceAtom = useSetAtom(serviceAtom);

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
        return innerAcc + parseFloat(item?.price); // Ensure price is a number
      }, 0);
      return acc + innerTotal;
    }, 0);

    const quantitySubtotal = exptectedQuanity.reduce((acc, quantity) => {
      if (!payload[quantity]) return acc; // Continue the accumulation without changing if no data for the service

      const innerTotal = payload[quantity]?.reduce((innerAcc, item) => {
        const result = item?.price * item?.quantity;
        return innerAcc + result;
      }, 0);

      return acc + innerTotal;
    }, 0);

    const newSubtotal = quantitySubtotal + serviceSubTotal;
    const newTotal = newSubtotal;
    setTotal(newTotal);
    form?.setValue("total", newTotal);
    setServiceAtom((prev) => ({ ...prev, total: newTotal }));
  }, []);

  return (
    <>
      <View className="px-4 flex-row justify-between items-start my-4">
        <Text className="font-bold ">Total</Text>
        <Text className="font-bold ">₱ {total.toFixed(2)}</Text>
      </View>
    </>
  );
};

export default TotalSection;
