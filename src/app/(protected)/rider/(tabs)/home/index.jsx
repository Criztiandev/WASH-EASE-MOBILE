import React from "react";
import { Text, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import axios from "axios";
import { atom, useAtom } from "jotai";

export const transactionAtoms = atom(null);

const RootScreen = () => {
  const [transactions, setTransactions] = useAtom(transactionAtoms);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const { laundry_shops } = result.data;

      const transformedData = laundry_shops
        ?.map((details) => {
          // Check if laundry_shop_transaction exists and is not empty
          if (
            details.laundry_shop_transaction &&
            details.laundry_shop_transaction.length > 0
          ) {
            const paidCustomer = details.laundry_shop_transaction.filter(
              (temp) => temp.payment_status === "PAID"
            );

            const isWalkedIn = paidCustomer.filter(
              (temp) => temp.customer_type !== "Walk In"
            );

            // Only return details if there are transactions
            if (isWalkedIn.length > 0) {
              return {
                id: details.id,
                title: details.laundry_shop_name || "Shop name",
                details: {
                  location:
                    details.laundry_shop_address || "Address is not available",
                  schedule: `Delivery count ${isWalkedIn?.length}`,
                  contact: details.phone_number,
                },
                transactions: isWalkedIn,
              };
            }
          }

          return null; // Return null for entries with no valid transactions
        })
        .filter((details) => details !== null); // Filter out entries with null transactions
      return transformedData || [];
    },
    queryKey: ["rider-tast-lists"],
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    console.log(error);
    return <ErrorScreen message={error.message} />;
  }

  const handleSelectTask = (id, payload) => {
    setTransactions(payload);
    router.push(`/rider/task/details/${id}`);
  };

  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">My Task</Text>
      <View className="flex-1 my-4">
        {data.length > 0 ? (
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <View className="">
                <HeroShopCard
                  {...item}
                  label={"View details"}
                  onNavigate={() =>
                    handleSelectTask(item.id, item?.transactions || [])
                  }
                />
              </View>
            )}
            estimatedItemSize={200}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-3xl ">No available Task</Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
