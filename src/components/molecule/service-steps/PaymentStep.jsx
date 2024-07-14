import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useController } from "react-hook-form";
import Divider from "../../atoms/Divider";
import ServiceTable from "../tables/ServiceTable";
import QuantityTable from "../tables/QuantityTable";
import TotalSection from "./TotalSection";
import { useSetAtom } from "jotai";
import { stepAtom } from "../../../service/states/service.atoms";

const PaymentStep = ({ form, name }) => {
  const [isGCash, setIsGcash] = useState(false);
  const [isFullService, setIsFullService] = useState(true);
  const setCurrentStep = useSetAtom(stepAtom);
  const deliveryMethod = form.watch("delivery-method");
  const paymentMethod = form.watch("payment-method");
  const transactionMethod = form.watch("transaction-method");

  useEffect(() => {
    setCurrentStep(name);

    return () => {
      setCurrentStep("");
    };
  }, []);

  useEffect(() => {
    setIsGcash(paymentMethod === "gcash");
    if (transactionMethod === "self_serivce") {
      setIsFullService(false);
    }
  }, [paymentMethod, transactionMethod]);

  return (
    <View className="flex-1  w-full mt-4">
      <ScrollView>
        <Text
          className="text-2xl font-bold m-4 text-center mb-2"
          variant="titleLarge"
        >
          Order Details
        </Text>

        <View className=" rounded-[5px] m-4 border border-gray-300">
          <Picker
            selectedValue={form.getValues("payment-method")}
            onValueChange={(value) => form.setValue("payment-method", value)}
          >
            <Picker.Item label="Choose Payment Method" value="" />
            <Picker.Item label="Cash" value="CASH" />
            <Picker.Item label="Gcash" value="G-CASH" />
          </Picker>
        </View>

        {isFullService && (
          <View className=" rounded-[5px] m-4 border border-gray-300">
            <Picker
              selectedValue={form.getValues("delivery-method")}
              onValueChange={(value) => form.setValue("delivery-method", value)}
            >
              <Picker.Item label="Choose Develivery Method" value="" />
              <Picker.Item label="Standard" value="standard" />
              <Picker.Item label="Rush" value="rush" />
            </Picker>
          </View>
        )}

        {isGCash && (
          <View className="flex justify-center items-center space-y-2">
            <View className="w-[200px] h-[200px] border rounded-[5px] mx-auto"></View>
            <Text>Scan QR Code</Text>
            <Text className="text-2xl font-bold">09482004868</Text>
          </View>
        )}

        <View className="px-4">
          {Object.keys(form.getValues()).map((key) => {
            const serviceKey = ["basic-service"];
            if (serviceKey.includes(key)) {
              const titleMap = {
                "basic-service": "Service",
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
            const expectedKey = [
              "basic-material",
              "basic-cleaning",
              "basic-ironing",
            ];

            if (expectedKey.includes(key)) {
              const titleMap = {
                "basic-material": "Service",
                "basic-cleaning": "Cleaning",
                "basic-ironing": "Ironing",
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
          <TotalSection
            mode={deliveryMethod}
            payload={form.getValues()}
            form={form}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentStep;
