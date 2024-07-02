import React, { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { TabView, SceneMap } from "react-native-tab-view";

import AboutTab from "../../../../components/views/tabs/AboutTab";
import ShopReviewTabs from "../../../../components/views/tabs/ShopReviewTabs";
import ShopServiceOfferTab from "../../../../components/views/tabs/ShopServiceOfferTab";
import ShopDetailsCover from "../../../../components/organism/ShopDetailsCover";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../components/atoms/ErrorScreen";

const ShopDetails = () => {
  const { id: shopID } = useLocalSearchParams();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "reviews", title: "Reviews" },
    { key: "service", title: "Service" },
  ]);

  const { isLoading, isError, data } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        "https://washease.online/api/get-all-laundry-shops",
        {
          headers: {
            Authorization:
              "Bearer 11|x0SPQs9C9Ycu0UDA5gBslV2JVHOMMQVZiJGpsdgY89e5c0b0",
          },
        }
      );

      const laundryDetails = response.data?.laundry_shops_location?.find(
        ({ id: currentID }) => currentID === Number(shopID)
      );

      if (!laundryDetails) return [];

      const { laundry_location, laundry_shops } = laundryDetails;

      return {
        details: { ...laundry_location },
        ratings: laundry_shops?.shops_rating || [],
        services: laundry_shops?.shop_services || [],
      };
    },
    queryKey: [`shop-details-${shopID}`],
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  const { details, rating, services } = data;

  const renderScene = SceneMap({
    about: () => (
      <AboutTab
        about="Details is not available"
        address={details?.laundry_shop_address}
        opening={details?.laundry_shop_open_hours || "N/A"}
      />
    ),
    reviews: () => <ShopReviewTabs data={rating} />,
    service: () => (
      <ShopServiceOfferTab data={services} id={shopID} status={true} />
    ),
  });

  return (
    <View className="flex-1">
      <ShopDetailsCover
        title={details?.laundry_shop_name}
        phoneNumber={details?.phone_number}
        rating={rating?.length || 0}
        status={details?.is_shop_closed === 0 ? "Closed" : "Open"}
      />
      <View className="flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </View>
  );
};

export default ShopDetails;
