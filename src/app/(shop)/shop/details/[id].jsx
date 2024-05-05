import { View, Text, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { TabView, SceneMap } from "react-native-tab-view";

import AboutTab from "../../../../components/views/tabs/AboutTab";
import ReviewTab from "../../../../components/views/tabs/ReviewTab";
import ServiceTab from "../../../../components/views/tabs/ServiceTab";
import Button from "../../../../components/atoms/Button";
import ScreenLayout from "../../../../layout/ScreenLayout";
import ShopDetailsCover from "../../../../components/organism/ShopDetailsCover";
const renderScene = SceneMap({
  about: AboutTab,
  reviews: ReviewTab,
  service: ServiceTab,
});

const ShopDetails = () => {
  const { id } = useLocalSearchParams();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "reviews", title: "Reviews" },
    { key: "service", title: "Service" },
  ]);

  return (
    <ScreenLayout>
      <ShopDetailsCover />

      <View className="flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>

      <View className="absolute bottom-0 px-4 w-full ">
        <Button>
          <Text className="text-white text-center font-bold text-[18px] ">
            Choose
          </Text>
        </Button>
      </View>
    </ScreenLayout>
  );
};

export default ShopDetails;
