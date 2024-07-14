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
import { useAuthContext } from "../../../../../context/AuthContext";

export const transactionAtoms = atom(null);

const RootScreen = () => {
  const { authState } = useAuthContext();
  const [transactions, setTransactions] = useAtom(transactionAtoms);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const result = await axios.post(
        `https://washease.online/api/get-all-rider-tasks/${authState.user_id}`
      );

      const { transactions } = result.data;

      const filterDatByStatus = transactions.filter(
        (transaction) => transaction.status !== "COMPLETED"
      );

      return filterDatByStatus || [];
    },
    queryKey: [`rider-task-${authState.user_id}`],
    refetchInterval: 500,
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
                  title={item?.customer_name}
                  details={{
                    location: item?.customer_address,
                    schedule: item?.payment_method,
                    contact: `P ${item?.total_bill}`,
                  }}
                  label={"View details"}
                  onNavigate={() => handleSelectTask(item.id, item)}
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
