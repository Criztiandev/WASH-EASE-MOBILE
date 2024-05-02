import { View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { TabView, SceneMap } from "react-native-tab-view";
import AboutTab from "../../../../../components/views/tabs/AboutTab";
import ShopServiceTab from "../../../../../components/views/tabs/shop-details/ShopServiceTab";
import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";

const ShopDetails = {
  name: "Shabu Houze",
  address: "Biringan Leyte",
  rating: 5.0,
  about:
    "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  opening: "5 AM - 6 PM",
  status: "Open",
};

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "service", title: "Service" },
  ]);

  const renderScene = SceneMap({
    about: () => <AboutTab {...ShopDetails} />,
    service: () => <ShopServiceTab {...ShopDetails} />,
  });

  return (
    <View className="flex-1">
      <ShopDetailsCover {...ShopDetails} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default RootScreen;
