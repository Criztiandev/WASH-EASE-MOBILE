import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Divider from "../../atoms/Divider";
import { useSetAtom } from "jotai";
import { serviceAtom } from "../../../service/states/service.atoms";

const TotalSection = ({ mode, form, payload }) => {
  const [total, setTotal] = useState(0);
  const setServiceAtom = useSetAtom(serviceAtom);

  const expectedService = ["basic-service"];
  const exptectedQuanity = [
    "basic-material",
    "basic-ironing",
    "basic-cleaning",
  ];

  useEffect(() => {
    const serviceSubTotal = calculateServiceTotal(payload, expectedService);
    const quantitySubtotal = calculateQuantityTotal(payload, exptectedQuanity);

    const overallTotal = calculateTotal(
      serviceSubTotal,
      quantitySubtotal,
      mode
    );
    setTotal(overallTotal);
    form?.setValue("total", overallTotal);
    setServiceAtom((prev) => ({ ...prev, total: overallTotal }));
  }, [mode]);

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

// Helpers
const calculateServiceTotal = (payload, expectedService) => {
  return expectedService.reduce((acc, service) => {
    if (!payload[service]) return acc; // Continue the accumulation without changing if no data for the service

    const innerTotal = payload[service].reduce((innerAcc, item) => {
      return innerAcc + parseFloat(item?.price); // Ensure price is a number
    }, 0);
    return acc + innerTotal;
  }, 0);
};
const calculateQuantityTotal = (payload, exptectedQuanity) => {
  return exptectedQuanity.reduce((acc, quantity) => {
    if (!payload[quantity]) return acc; // Continue the accumulation without changing if no data for the service

    const innerTotal = payload[quantity]?.reduce((innerAcc, item) => {
      const result = item?.price * item?.quantity;
      return innerAcc + result;
    }, 0);

    return acc + innerTotal;
  }, 0);
};
const calculateTotal = (serviceTotal, quantityTotal, mode) => {
  const deliveryPrice = mode === "rush" ? 300 : 0;
  return quantityTotal + serviceTotal + deliveryPrice;
};
