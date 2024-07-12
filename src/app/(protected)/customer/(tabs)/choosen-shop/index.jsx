import React, { useState } from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router } from "expo-router";
import { Searchbar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "../../../../../context/AuthContext";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import TransactionCard from "../../../../../components/molecule/cards/TransactionCard";

const RootScreen = () => {
  const { authState } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        `https://washease.online/api/get-customer-transactions/${authState["user_id"]}/`
      );

      return result?.data || [];
    },
    queryKey: [`choosen-shop-${authState["user_id"]}`],
    refetchInterval: 500,
  });

  const filteredData = data?.filter((item) =>
    item.service_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  console.log(data);

  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">Transactions</Text>

      <Searchbar
        placeholder="Search"
        className="bg-white mx-4"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <View className="flex-1 my-4">
        {filteredData?.length > 0 ? (
          <FlashList
            data={filteredData}
            renderItem={({ item }) => (
              <View className="">
                <TransactionCard {...item} />
              </View>
            )}
            estimatedItemSize={200}
            keyExtractor={(item) => item.id}
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
