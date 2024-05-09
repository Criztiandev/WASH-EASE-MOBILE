import { View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { TabView, SceneMap } from "react-native-tab-view";

import ShopServiceTab from "../../../../components/views/tabs/shop-details/ShopServiceTab";
import RequestTab from "../../../../components/views/tabs/RequestTab";
import AboutTab from "../../../../components/views/tabs/AboutTab";
import ShopDetailsCover from "../../../../components/organism/ShopDetailsCover";
const renderScene = SceneMap({
  about: AboutTab,
  service: ShopServiceTab,
  request: RequestTab,
});

const ShopDetails = () => {
  const { id } = useLocalSearchParams();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "service", title: "Service" },
    { key: "request", title: "Request" },
  ]);

  return (
    <View className="flex-1">
      <ShopDetailsCover />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default ShopDetails;
