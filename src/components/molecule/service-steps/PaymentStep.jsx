import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Picker } from "@react-native-picker/picker";
import { useController } from "react-hook-form";
import Divider from "../../atoms/Divider";

const MOCKDATA = [
  { id: 0, title: "Test" },
  { id: 1, title: "Test" },
  { id: 2, title: "Test" },
  { id: 3, title: "Test" },
  { id: 4, title: "Test" },
  { id: 5, title: "Test" },
  { id: 6, title: "Test" },
];

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
              return <ServiceTable payload={form.getValues(key)} />;
            }
          })}

          <Divider />

          {Object.keys(form.getValues()).map((key) => {
            const expectedKey = ["basic-material"];

            if (expectedKey.includes(key)) {
              return <QuantityTable payload={form.getValues(key)} />;
            }
          })}
          <Divider />
          <TotalSection />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentStep;

const ServiceTable = ({ payload }) => {
  return (
    <DataTable className="min-h-[64px]">
      <DataTable.Header>
        <DataTable.Title>
          <Text className="font-bold text-base">Service</Text>
        </DataTable.Title>

        <DataTable.Title numeric>
          <Text className="font-bold text-base">Price</Text>
        </DataTable.Title>
      </DataTable.Header>

      <View className="">
        <FlashList
          data={payload}
          renderItem={({ item }) => (
            <DataTable.Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}>
              <DataTable.Cell className="justify-start" numeric>
                <Text className="opacity-75">{item.title}</Text>
              </DataTable.Cell>

              <DataTable.Cell numeric>{item.price}</DataTable.Cell>
            </DataTable.Row>
          )}
          estimatedItemSize={200}
        />
      </View>
    </DataTable>
  );
};
const QuantityTable = ({ payload }) => {
  return (
    <DataTable className="min-h-[64px]">
      <DataTable.Header>
        <DataTable.Title>
          <Text className="font-bold text-base">Materials</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text className="font-bold text-">Quantity</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text className="font-bold text-">Price</Text>
        </DataTable.Title>
      </DataTable.Header>

      <View className="">
        <FlashList
          data={payload}
          renderItem={({ item }) => (
            <DataTable.Row style={{ justifyContent: "flex-start" }}>
              <DataTable.Cell className="justify-start" numeric>
                <Text className="opacity-75">{item.title}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
              <DataTable.Cell numeric>{item.price}</DataTable.Cell>
            </DataTable.Row>
          )}
          estimatedItemSize={200}
        />
      </View>
    </DataTable>
  );
};

const TotalSection = () => {
  return (
    <>
      <View className="py-4 space-y-4">
        <View className="flex-row justify-between items-start">
          <Text className="font-bold text-[18px]">Subtotal</Text>
          <Text className="font-bold text-[18px]">P 323232</Text>
        </View>
        <View className="flex-row justify-between items-start sa">
          <Text className="font-semibold text-[18px] opacity-50">Tax</Text>
          <Text className="font-bold text-[18px] ">P 0</Text>
        </View>
      </View>

      <Divider />

      <View className="flex-row justify-between items-start my-4">
        <Text className="font-bold text-[18px]">Total</Text>
        <Text className="font-bold text-[18px]">P 323232</Text>
      </View>
    </>
  );
};
