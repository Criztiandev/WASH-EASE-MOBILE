import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Picker } from "@react-native-picker/picker";
import { useController } from "react-hook-form";
import Divider from "../../atoms/Divider";
import ServiceTable from "./partials/ServiceTable";
import QuantityTable from "./partials/QuantityTable";
import TotalSection from "./partials/TotalSection";

const PaymentStep = ({ form, name }) => {
  const { field } = useController({
    control: form.control,
    name,
  });

  return (
    <View className="flex-1  w-full">
      <Text
        className="text-2xl font-bold m-4 text-center mb-2"
        variant="titleLarge">
        Order Details
      </Text>

      <View className=" rounded-[5px] m-4 border border-gray-300">
        <Picker selectedValue={field.value} onValueChange={field.onChange}>
          <Picker.Item label="Choose Payment Method" value="" />
          <Picker.Item label="Cash" value="cash" />
          <Picker.Item label="Gcash" value="gcash" />
        </Picker>
      </View>

      <ScrollView>
        <View className="px-4">
          {Object.keys(form.getValues()).map((key) => {
            const serviceKey = ["basic-service"];
            if (serviceKey.includes(key)) {
              const titleMap = {
                "basic-service": "Service",
              };

              return (
                <ServiceTable
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
