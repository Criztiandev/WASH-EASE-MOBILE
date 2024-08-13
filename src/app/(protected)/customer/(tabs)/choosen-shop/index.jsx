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
      const filtered = result.data.filter(
        (transaction) => transaction.status !== "COMPLETED"
      );

      const fullDetails = await Promise.all(
        filtered.map(async (items) => {
          const { laundry_shop_id } = items;

          const response = await axios.get(
            `https://washease.online/api/laundry-shop/users/${laundry_shop_id}`,
            {
              headers: { Authorization: `Bearer ${authState.token}` },
            }
          );

          const { data: Details } = response?.data;

          const { laundry_shop_name, laundry_shop_address, phone_number } =
            Details;

          return {
            id: laundry_shop_id,
            shopName: laundry_shop_name,
            address: laundry_shop_address,
            contact: phone_number,
            service_type: items?.service_type,
            total_bill: items?.total_bill,
            status: items.status,
          };
        })
      );

      return fullDetails || [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }, [authState]);

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchTransactions,
    queryKey: [`choosen-shop-${authState["user_id"]}`],
    // refetchInterval: 1000,
  });

  const filteredData =
    data?.filter((item) =>
      item.service_type.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <LoadingScreen />;

  console.log(JSON.stringify(filteredData, null, 2));

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
            data={filteredData.reverse()}
            renderItem={({ item }) => (
              <TransactionCard
                {...item}
                onNavigate={() =>
                  router.push(
                    `/shop/choosen/request/${item.id}?transactionID=${item.id}`
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
