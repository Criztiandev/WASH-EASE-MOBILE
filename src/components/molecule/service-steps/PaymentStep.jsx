import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Divider from "../../atoms/Divider";
import ServiceTable from "../tables/ServiceTable";
import QuantityTable from "../tables/QuantityTable";
import TotalSection from "./TotalSection";
import { useSetAtom } from "jotai";
import { stepAtom } from "../../../service/states/service.atoms";
import QRCode from "react-native-qrcode-svg";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../atoms/LoadingScreen";
import ErrorScreen from "../../atoms/ErrorScreen";
import axios from "axios";

const PaymentStep = ({ shopID = 1, form, name }) => {
  const setCurrentStep = useSetAtom(stepAtom);
  const deliveryMethod = form.watch("delivery-method");
  const paymentMethod = form.watch("payment-method");
  const transactionMethod = form.watch("transaction-method");

  const isGCash = useMemo(() => paymentMethod === "G-CASH", [paymentMethod]);
  const isFullService = useMemo(
    () => transactionMethod !== "self_serivce",
    [transactionMethod]
  );

  const { isLoading, isError, data, refetch } = useQuery({
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://washease.online/api/get-all-laundry-shops"
        );
        const { laundry_shops } = response?.data;
        return laundry_shops?.find((items) => items?.id === shopID);
      } catch (err) {
        console.error("Error fetching shop details:", err);
        throw err;
      }
    },
    queryKey: [`shop-details-payment-${shopID}`],
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

  const renderServiceTables = () => {
    const serviceKeys = ["basic-service"];
    return serviceKeys.map((key) => (
      <ServiceTable key={key} title="Service" payload={form.getValues(key)} />
    ));
  };

  const renderQuantityTables = () => {
    const quantityKeys = ["basic-material", "basic-cleaning", "basic-ironing"];
    const titleMap = {
      "basic-material": "Service",
      "basic-cleaning": "Cleaning",
      "basic-ironing": "Ironing",
    };
    return quantityKeys.map((key) => (
      <QuantityTable
        key={key}
        title={titleMap[key]}
        payload={form.getValues(key)}
      />
    ));
  };

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
            <Text className="text-lg my-4 font-semibold">
              Mobile No.: {data?.phone_number}
            </Text>
            <Text className="text-lg font-semibold">
              {data?.laundry_shop_name}
            </Text>
          </View>
        )}

        <View className="rounded-[5px] m-4 border border-gray-300">
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
          <View className="rounded-[5px] m-4 border border-gray-300">
            <Picker
              selectedValue={form.getValues("delivery-method")}
              onValueChange={(value) => form.setValue("delivery-method", value)}
            >
              <Picker.Item label="Choose Delivery Method" value="" />
              <Picker.Item label="Standard" value="standard" />
              <Picker.Item label="Rush" value="rush" />
            </Picker>
          </View>
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

export default PaymentStep;
