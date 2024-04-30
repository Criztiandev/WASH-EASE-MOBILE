import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Picker } from "@react-native-picker/picker";
import { useController } from "react-hook-form";

const MOCKDATA = [
  { id: 0, title: "Test" },
  { id: 1, title: "Test" },
  { id: 2, title: "Test" },
  { id: 3, title: "Test" },
  { id: 4, title: "Test" },
  { id: 5, title: "Test" },
  { id: 6, title: "Test" },
];

const PaymentStep = ({ controller, name }) => {
  const { field } = useController({
    control: controller,
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
          <DataTable className="h-[300px] ">
            <DataTable.Header>
              <DataTable.Title>
                <Text className="font-bold text-base">Service</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text className="font-bold text-">Quantity</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text className="font-bold text-">Price</Text>
              </DataTable.Title>
            </DataTable.Header>

            <FlashList
              data={MOCKDATA}
              renderItem={(item) => (
                <DataTable.Row
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}>
                  <DataTable.Cell className="justify-start" numeric>
                    <Text className="opacity-75">Regular Wash</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>2</DataTable.Cell>
                  <DataTable.Cell numeric>99</DataTable.Cell>
                </DataTable.Row>
              )}
              estimatedItemSize={200}
            />
          </DataTable>

          <View
            style={{ borderStyle: "dashed" }}
            className="border-b-[1.5px] border-gray-400 my-2"></View>

          <DataTable className="h-[300px] ">
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

            <FlashList
              data={MOCKDATA}
              renderItem={(item) => (
                <DataTable.Row style={{ justifyContent: "flex-start" }}>
                  <DataTable.Cell className="justify-start" numeric>
                    <Text className="opacity-75">Regular Wash</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>2</DataTable.Cell>
                  <DataTable.Cell numeric>99</DataTable.Cell>
                </DataTable.Row>
              )}
              estimatedItemSize={200}
            />
          </DataTable>

          <View
            style={{ borderStyle: "dashed" }}
            className="border-b-[1.5px] border-gray-400 my-2"></View>

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

          <View
            style={{ borderStyle: "dashed" }}
            className="border-b-[1.5px] border-gray-400 my-2"></View>

          <View className="flex-row justify-between items-start my-4">
            <Text className="font-bold text-[18px]">Total</Text>
            <Text className="font-bold text-[18px]">P 323232</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentStep;
