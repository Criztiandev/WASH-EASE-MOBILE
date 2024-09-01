import React, { useEffect, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import axios from "axios";
import QRCode from "react-native-qrcode-svg";

import Divider from "../../atoms/Divider";
import ServiceTable from "../tables/ServiceTable";
import QuantityTable from "../tables/QuantityTable";
import TotalSection from "./TotalSection";
import LoadingScreen from "../../atoms/LoadingScreen";
import { stepAtom } from "../../../service/states/service.atoms";

const PaymentStep = ({ shopID = 1, form, name }) => {
  const setCurrentStep = useSetAtom(stepAtom);
  const deliveryMethod = form.watch("delivery-method");
  const paymentMethod = form.watch("payment-method");
  const transactionMethod = form.watch("transaction-method");

  const isGCash = useMemo(() => paymentMethod === "G-CASH", [paymentMethod]);
  const isFullService = useMemo(
    () => transactionMethod !== "self_service",
    [transactionMethod]
  );

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [`shop-details-payment-${shopID}`],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://washeaselaundry.online/api/get-all-laundry-shops"
        );

        const { laundry_shops } = response.data;

        const laundryDetails = laundry_shops?.find(
          (item) => Number(item.id) === Number(shopID)
        );

        if (!laundryDetails) {
          throw new Error("Shop not found");
        }

        return {
          name: laundryDetails?.laundry_shop_name,
          phone_number: laundryDetails?.phone_number,
        };
      } catch (err) {
        console.error("Error fetching shop details:", err);
        throw err;
      }
    },
  });

  useEffect(() => {
    setCurrentStep(name);
    return () => setCurrentStep("");
  }, [name, setCurrentStep]);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    refetch();
    return <LoadingScreen />;
  }

  const renderTables = (keys, TableComponent, titleMap = {}) => {
    return keys.map((key) => (
      <TableComponent
        key={key}
        title={titleMap[key] || "Service"}
        payload={form.getValues(key)}
      />
    ));
  };

  const renderServiceTables = () =>
    renderTables(["basic-service"], ServiceTable);

  const renderQuantityTables = () =>
    renderTables(
      ["basic-material", "basic-cleaning", "basic-ironing"],
      QuantityTable,
      {
        "basic-material": "Service",
        "basic-cleaning": "Cleaning",
        "basic-ironing": "Ironing",
      }
    );

  return (
    <View className="flex-1 w-full mt-4">
      <ScrollView>
        <Text className="text-2xl font-bold m-4 text-center mb-4">
          Order Details
        </Text>

        {isGCash && (
          <View className="text-center items-center justify-center">
            <View className="mx-4 px-4 w-[90%] rounded-md">
              <QRCode value={data?.phone_number} size={300} />
            </View>
            <View className="justify-center items-center my-4">
              <Text className="text-lg font-semibold">
                Mobile No: {data?.phone_number}
              </Text>
              <Text className="text-lg break-words w-[250px] text-center  text-black">
                {data?.name}
              </Text>
            </View>
          </View>
        )}

        <PickerComponent
          selectedValue={form.getValues("payment-method")}
          onValueChange={(value) => form.setValue("payment-method", value)}
          items={[
            { label: "Choose Payment Method", value: "" },
            { label: "Cash", value: "CASH" },
            { label: "Gcash", value: "G-CASH" },
          ]}
        />

        {isFullService && (
          <PickerComponent
            selectedValue={form.getValues("delivery-method")}
            onValueChange={(value) => form.setValue("delivery-method", value)}
            items={[
              { label: "Choose Delivery Method", value: "" },
              { label: "Standard", value: "standard" },
              { label: "Rush", value: "rush" },
            ]}
          />
        )}

        <View className="px-4">
          {renderServiceTables()}
          <Divider />
          {renderQuantityTables()}
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

const PickerComponent = ({ selectedValue, onValueChange, items }) => (
  <View className="rounded-[5px] m-4 border border-gray-300">
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {items.map(({ label, value }) => (
        <Picker.Item key={value} label={label} value={value} />
      ))}
    </Picker>
  </View>
);

export default PaymentStep;
