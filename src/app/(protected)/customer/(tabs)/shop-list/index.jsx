import { View, FlatList, Text, Modal } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
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
import { SafeAreaView } from "react-native-safe-area-context";

const ShoplistScreen = () => {
  const [isShowModal, setIsShowModal] = useState(false);
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
          location: item?.["address"] || "N/A",
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
    refetchInterval: 800,
  });

  const { searchQuery, setSearchQuery, filteredData } = useSearch(
    data,
    "title"
  );

  if (isLoading)
    return (
      <SafeAreaView className="flex-1 ">
        <View className="flex-1 bg-[##feca57] justify-center items-center">
          <Text>Loading..</Text>
        </View>
      </SafeAreaView>
    );
  if (isError) return <ErrorScreen />;

  return (
    <ScreenLayout>
      <View className="flex-1">
        <View className="px-4 my-4">
          <View className="flex-row">
            <Searchbar
              placeholder="Search"
              className="bg-white w-[85%]"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <IconButton
              icon={"filter"}
              className="bg-white w-[52px] h-[52px] rounded-full"
              onPress={() => setIsShowModal((prev) => !prev)}
            />
          </View>
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

      <Modal animationType="slide" visible={isShowModal}>
        <View className="p-4 flex-row justify-between items-center">
          <Text className="text-[32px] font-bold">Filter</Text>
          <IconButton
            icon={"close"}
            onPress={() => setIsShowModal((prev) => !prev)}
          />
        </View>
      </Modal>
    </ScreenLayout>
  );
};

export default ShoplistScreen;
