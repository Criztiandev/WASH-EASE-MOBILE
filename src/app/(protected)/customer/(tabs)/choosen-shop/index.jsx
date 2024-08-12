import React, { useState, useCallback } from "react";
import { Text, View, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "../../../../../context/AuthContext";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import TransactionCard from "../../../../../components/molecule/cards/TransactionCard";

const RootScreen = () => {
  const { authState } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransactions = useCallback(async () => {
    try {
      const result = await axios.get(
        `https://washease.online/api/get-customer-transactions/${authState["user_id"]}/`
      );
      return result.data.filter(
        (transaction) => transaction.status !== "COMPLETED"
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }, [authState]);

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchTransactions,
    queryKey: [`choosen-shop-${authState["user_id"]}`],
    refetchInterval: 5000,
  });

  const filteredData =
    data?.filter((item) =>
      item.service_type.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <LoadingScreen />;

  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">Transactions</Text>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search transactions..."
        className=" py-3 bg-white px-8 mx-4 rounded-full border border-gray-300 "
      />
      <View className="flex-1 my-4">
        {filteredData.length > 0 ? (
          <FlashList
            data={filteredData}
            renderItem={({ item }) => (
              <TransactionCard
                {...item}
                onNavigate={() =>
                  router.push(
                    `/shop/choosen/request/${item.laundry_shop_id}?transactionID=${item.id}`
                  )
                }
              />
            )}
            estimatedItemSize={200}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-[24px] font-bold opacity-50">
              No Transactions available
            </Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
