import React, { useCallback, useState } from "react";
import { View, useWindowDimensions, TouchableOpacity } from "react-native";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { TabView, SceneMap } from "react-native-tab-view";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, Check } from "lucide-react-native";

import AboutTab from "../../../../components/views/tabs/AboutTab";
import ShopReviewTabs from "../../../../components/views/tabs/ShopReviewTabs";
import ShopServiceOfferTab from "../../../../components/views/tabs/ShopServiceOfferTab";
import ShopDetailsCover from "../../../../components/organism/ShopDetailsCover";
import LoadingScreen from "../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../components/atoms/ErrorScreen"; // You'll need to create this component

const ShopDetails = () => {
  const { id: shopID } = useLocalSearchParams();
  const layout = useWindowDimensions();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "reviews", title: "Reviews" },
    { key: "service", title: "Service" },
  ]);

  const { isLoading, isError, data, refetch } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );

      const { laundry_shops } = response.data;

      const laundryDetails = laundry_shops?.find(
        (item) => Number(item.id) === Number(shopID)
      );

      if (!laundryDetails) {
        throw new Error("Shop not found");
      }

      const laundryServiceAndRating = laundry_shops?.filter(
        ({ id: currentID }) => Number(currentID) === Number(shopID)
      );

      const { shop_services, shops_rating } = laundryServiceAndRating[0] || {};

      return {
        details: laundryDetails,
        ratings: shops_rating || [],
        services: shop_services || [],
      };
    },
    queryKey: [`shop-details-${shopID}`],
    staleTime: 30000,
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen onRetry={refetch} />;

  const { details, ratings, services } = data;

  console.log(JSON.stringify(details, null, 2));

  const renderScene = SceneMap({
    about: () => (
      <AboutTab
        about="Details is not available"
        address={details?.laundry_shop_address || "N/A"}
        opening={details?.laundry_shop_open_hours || "N/A"}
      />
    ),
    reviews: () => <ShopReviewTabs data={ratings} />,
    service: () => (
      <ShopServiceOfferTab data={services} id={shopID} status={true} />
    ),
  });

  const HeaderLeft = () => (
    <TouchableOpacity onPress={() => router.back()}>
      <ArrowLeft color="black" className="mr-4" />
    </TouchableOpacity>
  );

  const HeaderRight = () => {
    const handleSelect = () => {
      router.push(`/shop/transaction/${shopID}`);
    };

    return (
      <>
        {details?.is_shop_closed !== 0 && (
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="rounded-full p-4"
              onPress={handleSelect}
            >
              <Check color="black" />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Details",
          headerLeft: HeaderLeft,
          headerRight: HeaderRight,
        }}
      />

      <View className="flex-1">
        <ShopDetailsCover
          title={details?.laundry_shop_name || "Shop Name"}
          phoneNumber={details?.phone_number || "09288383838"}
          rating={ratings?.length || 0}
          status={details?.is_shop_closed === 0 ? "Closed" : "Open"}
        />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </>
  );
};

export default ShopDetails;
