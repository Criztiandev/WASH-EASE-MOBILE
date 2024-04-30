import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useController } from "react-hook-form";
import Divider from "../../atoms/Divider";
import ServiceTable from "./partials/ServiceTable";
import QuantityTable from "./partials/QuantityTable";
import TotalSection from "./partials/TotalSection";
import { useSetAtom } from "jotai";
import { stepAtom } from "../../../service/states/service.atoms";

const PaymentStep = ({ form, name }) => {
  const [isGCash, setIsGcash] = useState(false);
  const [isFullService, setIsFullService] = useState(false);
  const setCurrentStep = useSetAtom(stepAtom);

  useEffect(() => {
    setCurrentStep(name);

    return () => {
      setCurrentStep("");
    };
  }, []);

  useEffect(() => {
    const paymentMethod = form.watch("payment-method");
    const deliveryMethod = form.watch("delivery-method");

    setIsGcash(paymentMethod === "gcash");
    setIsFullService(deliveryMethod !== "self-service");
  }, [form.watch("method")]);

  return (
    <View className="flex-1  w-full">
      <Text
        className="text-2xl font-bold m-4 text-center mb-2"
        variant="titleLarge">
        Order Details
      </Text>

      <View className=" rounded-[5px] m-4 border border-gray-300">
        <Picker
          selectedValue={form.getValues("payment-method")}
          onValueChange={(value) => form.setValue("payment-method", value)}>
          <Picker.Item label="Choose Payment Method" value="" />
          <Picker.Item label="Cash" value="cash" />
          <Picker.Item label="Gcash" value="gcash" />
        </Picker>
      </View>

      {isFullService && (
        <View className=" rounded-[5px] m-4 border border-gray-300">
          <Picker
            selectedValue={form.getValues("delivery-method")}
            onValueChange={(value) => form.setValue("delivery-method", value)}>
            <Picker.Item label="Choose Develivery Method" value="" />
            <Picker.Item label="Pick up" value="pick-up" />
            <Picker.Item label="Delivery" value="delivery" />
          </Picker>
        </View>
      )}

      <ScrollView>
        {isGCash && (
          <View className="flex justify-center items-center space-y-2">
            <View className="w-[200px] h-[200px] border rounded-[5px] mx-auto"></View>
            <Text>Scan QR Code</Text>
            <Text className="text-2xl font-bold">09482004868</Text>
          </View>
        )}

        <View className="px-4">
          {Object.keys(form.getValues()).map((key) => {
            const serviceKey = [
              "basic-service",
              "basic-cleaning",
              "basic-ironing",
            ];
            if (serviceKey.includes(key)) {
              const titleMap = {
                "basic-service": "Service",
                "basic-cleaning": "Cleaning",
                "basic-ironing": "Ironing",
              };

              return (
                <ServiceTable
                  key={key}
                  title={titleMap[key]}
                  payload={form.getValues(key)}
                />
              );
            }
          })}

          <Divider />

          {Object.keys(form.getValues()).map((key) => {
            const expectedKey = ["basic-material"];

            if (expectedKey.includes(key)) {
              const titleMap = {
                "basic-material": "Service",
              };
              return (
                <QuantityTable
                  key={key}
                  title={titleMap[key]}
                  payload={form.getValues(key)}
                />
              );
            }
          })}
          <Divider />
          <TotalSection payload={form.getValues()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentStep;
