import { View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useMemo, useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import { FlashList } from "@shopify/flash-list";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import useSearch from "../../../../../hooks/useSearch";

const ShoplistScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );

      const _payload = result.data["laundry_shops"].data;
      const transformedPayload = _payload.map((item) => ({
        id: item.id,
        title: item["laundry_shop_name"],
        image:
          "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
        details: {
          location: item["address"],
          contact: item["phone_number"],
          schedule:
            item["laundry_shop_open_hours"] === null
              ? "N/A"
              : item["laundry_shop_open_hours"],
        },
        status: item["is_shop_closed"] === 0 ? "close" : "active",
      }));

      return transformedPayload;
    },
    queryKey: ["shops-lists"],
  });

  const { searchQuery, setSearchQuery, filteredData } = useSearch(
    data,
    "title"
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <ScreenLayout>
      <View className="flex-1">
        <View className="px-4 my-4">
          <Searchbar
            placeholder="Search"
            className="bg-white"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View className="flex-1">
          <FlashList
            data={filteredData}
            estimatedItemSize={200}
            renderItem={({ item }) => (
              <HeroShopCard
                {...item}
                label={"View details"}
                onNavigate={() => router.push(`/shop/details/${item.id}`)}
              />
            )}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default ShoplistScreen;
