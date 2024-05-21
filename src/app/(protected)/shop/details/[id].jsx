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
      console.log(shopID);
      const result = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const laundryDetails = result.data?.laundry_shops?.data?.find(
        ({ id: currentID }) => currentID === Number(shopID)
      );

      return laundryDetails;
    },
    queryKey: [`shop-details-${shopID}`],
    refetchInterval: 800,
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  console.log(data);

  const renderScene = SceneMap({
    about: () => (
      <AboutTab
        about="The Place is full of shenanigans"
        address={data?.address}
        opening={data?.laundry_shop_open_hours || "N/A"}
      />
    ),
    reviews: () => <ShopReviewTabs data={data?.shops_rating} />,
    service: () => (
      <ShopServiceOfferTab
        data={data?.shop_services}
        id={shopID}
        status={true}
      />
    ),
  });

  return (
    <View className="flex-1">
      <ShopDetailsCover
        title={data?.laundry_shop_name}
        phoneNumber={data?.phone_number}
        rating={data?.shops_rating?.length || 0}
        status={data?.is_shop_closed === 0 ? "Closed" : "Open"}
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
