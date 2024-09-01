import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { atom, useSetAtom } from "jotai";
import axios from "axios";
import Toast from "react-native-toast-message";

import ScreenLayout from "../../../../../layout/ScreenLayout";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import { useAuthContext } from "../../../../../context/AuthContext";

export const transactionAtoms = atom(null);

const RootScreen = () => {
  const { authState } = useAuthContext();
  const setTransactions = useSetAtom(transactionAtoms);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`rider-task-${authState.user_id}`],
    queryFn: async () => {
      const result = await axios.post(
        `https://washeaselaundry.online/api/get-all-rider-tasks/${authState.user_id}`
      );
      const { transactions } = result.data;

      const filteredTransactionData = transactions.filter(
        (transaction) => transaction.status !== "COMPLETED"
      );

      // add details to the user
      const transformedTransactionData = await Promise.all(
        filteredTransactionData.map(async (transaction) => {
          const { customer_id } = transaction;

          const { data } = await axios.get(
            `https://washeaselaundry.online/api/get-customer-details/${customer_id}`
          );

          data.avatar = null;
          return {
            id: transaction.id,
            customer_id: customer_id,
            total: transaction.total_bill,
            ...data,
          };
        })
      );

      return transformedTransactionData;
    },
    refetchInterval: 30000,
  });

  const handleSelectTask = useCallback(
    (id, transactionID, payload) => {
      setTransactions(payload);
      router.push(`/rider/task/details/${id}?transactionID=${transactionID}`);
    },
    [setTransactions]
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    refetch();
    return <LoadingScreen />;
  }

  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">My Task</Text>
      <View className="flex-1 my-4">
        {data.length > 0 ? (
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <HeroShopCard
                title={`${item?.first_name} ${item.last_name}` || "John Doe"}
                details={{
                  location: item?.address,
                  schedule: item?.phone_number,
                  contact: `P ${item?.total}`,
                }}
                label={
                  item?.customer_address === null
                    ? "No Address specified"
                    : "View details"
                }
                onNavigate={() => {
                  if (item?.customer_address === null) {
                    Toast.show({
                      type: "error",
                      text1:
                        "There is no location specified. Please provide one.",
                    });
                    return;
                  }
                  handleSelectTask(item.customer_id, item.id, item);
                }}
              />
            )}
            estimatedItemSize={200}
            keyExtractor={(item) => item?.id.toString()}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-3xl">No available Tasks</Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
