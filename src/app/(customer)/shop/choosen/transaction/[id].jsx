import { View, Text, ScrollView } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import ServiceTable from "../../../../../components/molecule/service-steps/partials/ServiceTable";
import Divider from "../../../../../components/atoms/Divider";
import QuantityTable from "../../../../../components/molecule/service-steps/partials/QuantityTable";
import { DataTable } from "react-native-paper";
import TotalSection from "../../../../../components/molecule/service-steps/partials/TotalSection";
import Button from "../../../../../components/atoms/Button";

const ShopDetails = {
  name: "Shabu Houze",
  address: "Biringan Leyte",
  rating: 5.0,
  about:
    "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  opening: "5 AM - 6 PM",
  status: "Open",
};

const RootScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <ShopDetailsCover {...ShopDetails} />

      <ScrollView>
        <View className="p-4 space-y-4">
          <View
            className="border-[1.5px]  border-gray-400 my-4"
            style={{ borderStyle: "dashed" }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>
                  <Text className="font-bold text-base">Mode</Text>
                </DataTable.Title>
                <DataTable.Title className="justify-end">
                  <Text className="font-bold text-base "></Text>
                </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Service</DataTable.Cell>
                <DataTable.Cell>Full Service</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Delivery</DataTable.Cell>
                <DataTable.Cell>Pick up and Delivery</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Payment</DataTable.Cell>
                <DataTable.Cell>Cash</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <Divider />

            <ServiceTable title={"Service"} />
            <Divider />
            <QuantityTable title={"Materials"} />
            <Divider />
            <TotalSection payload={[]} />
          </View>
        </View>

        <View className="px-4">
          <Button onPress={() => router.back()}>
            <Text className="text-center font-bold text-white text-lg">
              Back
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default RootScreen;
