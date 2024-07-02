import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import useSearch from "../../../../../hooks/useSearch";
import { Picker } from "@react-native-picker/picker";
import Button from "../../../../../components/atoms/Button";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import useRatingFilter from "../../../../../hooks/useRatingFilter";
import useCombinedFilter from "../../../../../hooks/useCombineFilter";

const ShoplistScreen = () => {
  const [flag, setFlag] = useState("all");
  const [isShowModal, setIsShowModal] = useState(false);
  const [servicePrice, setServicePrice] = useState(0);
  const [ratingFilter, setRatingFilter] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );

      const transformedData = result.data?.laundry_shops?.map((items) => ({
        ...items,
        avarageRating:
          items.shops_rating.reduce((sum, rating) => sum + rating, 0) /
          items.shops_rating.length,
      }));

      return transformedData || [];
    },
    queryKey: ["shops-lists"],
    refetchInterval: 500,
  });

  const { searchQuery, setSearchQuery, filteredData } = useCombinedFilter(
    data,
    "laundry_shop_name",
    ratingFilter
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 4, marginTop: 4 }}>
          <View style={{ flexDirection: "row" }} className="m-4">
            <Searchbar
              placeholder="Search"
              style={{ backgroundColor: "white", width: "85%" }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <IconButton
              icon="filter"
              style={{
                backgroundColor: "white",
                width: 52,
                height: 52,
                borderRadius: 26,
              }}
              onPress={() => setIsShowModal((prev) => !prev)}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {filteredData?.length > 0 ? (
            <FlashList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <HeroShopCard
                    image="https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title={item?.laundry_shop_name}
                    details={{
                      location: item?.laundry_shop_address || "N/Ar",
                      schedule: item?.avarageRating || "N/A",
                      contact: item?.phone_number || "N/A",
                    }}
                    label="View details"
                    onNavigate={() => router.push(`/shop/details/${item.id}`)}
                  />
                );
              }}
              estimatedItemSize={200}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 32, opacity: 0.5 }}>No Result</Text>
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
              onValueChange={(value) => setRatingFilter(value)}
            >
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
              onValueChange={(value) => setServicePrice(value)}
            >
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
              <Text>Filter</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
};

export default ShoplistScreen;
