import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import { router, useFocusEffect } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "../../../../../context/AuthContext";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import TransactionCard from "../../../../../components/molecule/cards/TransactionCard";
import * as Crypto from "expo-crypto";
import { FlatList } from "react-native-gesture-handler";
import useFetchTransaction from "../../../../../hooks/useFetchTransaction";

const RootScreen = () => {
  const fetcher = useFetchTransaction();
  const [isFocused, setIsFocused] = useState(false);
  const { authState } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: fetcher,
    queryKey: [`choosen-shop-${authState["user_id"]}`],
    enabled: isFocused,
  });

  const filteredData = useMemo(() => {
    return (
      data?.filter((item) =>
        item.service_type.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [data, searchQuery]);

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <LoadingScreen />;

  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">Transactions</Text>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search transactions..."
        className="py-3 bg-white px-8 mx-4 rounded-full border border-gray-300"
      />
      <View className="flex-1 my-4">
        {filteredData.length > 0 ? (
          <>
            <FlashList
              data={filteredData.reverse()}
              renderItem={({ item }) => (
                <TransactionCard
                  {...item}
                  onNavigate={() =>
                    router.push(
                      `/shop/choosen/request/${item.laundry_shop_id}?transactionID=${item?.id}`
                    )
                  }
                />
              )}
              estimatedItemSize={1000}
            />
          </>
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

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
