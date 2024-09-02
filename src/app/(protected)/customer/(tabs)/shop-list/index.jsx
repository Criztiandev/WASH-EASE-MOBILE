import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import { Picker } from "@react-native-picker/picker";
import Button from "../../../../../components/atoms/Button";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router, useFocusEffect } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import useCombinedFilter from "../../../../../hooks/useCombineFilter";
import { Filter, X } from "lucide-react-native";

import laundryApi from "../../../../../api/laundry.api";

const ShoplistScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["home-laundry-shops-list"],
    queryFn: async () => {
      try {
        return await laundryApi.fetchAllLaundryShopLocation();
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    enabled: isFocused,
  });

  const { searchQuery, setSearchQuery, filteredData } = useCombinedFilter(
    data,
    "laundry_shop_name",
    ratingFilter
  );

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    refetch();
    return <LoadingScreen />;
  }

  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 4, marginTop: 4 }}>
          <View style={{ flexDirection: "row" }} className="m-4">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="border flex-1 rounded-full bg-white border-gray-400/20 px-8 "
              placeholder="Search here"
            />

            <TouchableOpacity
              onPress={() => setIsShowModal((prev) => !prev)}
              className="rounded-full p-4 "
            >
              <Filter color="black" fill="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {filteredData?.length > 0 ? (
            <FlashList
              data={filteredData.reverse()}
              renderItem={({ item }) => {
                return (
                  <HeroShopCard
                    title={item?.name}
                    details={{
                      location: item?.address || "Taguig",
                      contact: item?.phoneNumber || "N/A",
                    }}
                    isOpen={item?.isOpen || "Open"}
                    label="View details"
                    onNavigate={() =>
                      router.navigate(`/shop/details/${item?.id}`)
                    }
                  />
                );
              }}
              estimatedItemSize={1000}
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
          <TouchableOpacity onPress={() => setIsShowModal((prev) => !prev)}>
            <X color="black" fill="black" />
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <Text className="text-md mb-2">Select Rating</Text>
          <View className="border border-gray-300 rounded-[5px]">
            <Picker
              selectedValue={ratingFilter}
              onValueChange={(value) => setRatingFilter(value)}
            >
              <Picker.Item label="Select Rating" value={0} />
              <Picker.Item label="Filter None" value={0} />
              <Picker.Item label="1 star" value={1} />
              <Picker.Item label="2 star" value={2} />
              <Picker.Item label="3 star" value={3} />
              <Picker.Item label="4 star" value={4} />
              <Picker.Item label="5 star" value={5} />
            </Picker>
          </View>
        </View>

        <View className="px-4 my-4">
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
