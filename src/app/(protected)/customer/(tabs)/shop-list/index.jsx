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
import { Picker } from "@react-native-picker/picker";
import Button from "../../../../../components/atoms/Button";

const ShoplistScreen = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );

      const _payload = result.data["laundry_shops"].data;

      console.log(_payload);

      const transformedPayload = _payload.map((item) => {
        const averageRating =
          item["shops_rating"].length > 0
            ? item["shops_rating"].reduce(
                (sum, rating) => sum + rating.rating_count,
                0
              ) / item["shops_rating"].length
            : 0;

        return {
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
          averageRating: Math.round(averageRating * 10) / 10, // round to one decimal place
          status: item["is_shop_closed"] === 0 ? "close" : "active",
        };
      });

      return transformedPayload;
    },
    queryKey: ["shops-lists"],
    refetchInterval: 800,
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  const { searchQuery, setSearchQuery, filteredData } = useSearch(
    data,
    "title",
    ratingFilter
  );

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
          {filteredData?.length > 0 ? (
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
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-[32px] opacity-50">No Result</Text>
            </View>
          )}
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

        <View className="px-4">
          <Text className="text-md mb-2">Select Rating</Text>
          <View className="border border-gray-300 rounded-[5px]">
            <Picker
              selectedValue={ratingFilter}
              onValueChange={(value) => setRatingFilter(value)}>
              <Picker.Item label="Select Rating" value={0} />
              <Picker.Item label="1 star" value={1} />
              <Picker.Item label="2 star" value={2} />
              <Picker.Item label="3 star" value={3} />
              <Picker.Item label="4 star" value={4} />
              <Picker.Item label="5 star" value={5} />
            </Picker>
          </View>
        </View>

        <View className="px-4 my-4">
          <Text className="text-md mb-2">Filter Service</Text>
          <View className="border border-gray-300 rounded-[5px]">
            <Picker
              selectedValue={servicePrice}
              onValueChange={(value) => setServicePrice(value)}>
              <Picker.Item label="Select Rating" value={0} />
              <Picker.Item label="100" value={100} />
              <Picker.Item label="200" value={200} />
              <Picker.Item label="300" value={300} />
              <Picker.Item label="400" value={400} />
              <Picker.Item label="500" value={500} />
              <Picker.Item label="600" value={600} />
              <Picker.Item label="700" value={700} />
              <Picker.Item label="800" value={800} />
              <Picker.Item label="900" value={900} />
              <Picker.Item label="1000" value={1000} />
            </Picker>
          </View>

          <View className="my-4">
            <Button onPress={() => setIsShowModal((prev) => !prev)}>
              Filter
            </Button>
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
};

export default ShoplistScreen;
