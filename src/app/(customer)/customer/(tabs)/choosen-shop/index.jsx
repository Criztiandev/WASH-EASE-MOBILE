import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import ScreenLayout from "../../../../../layout/ScreenLayout";
import RequestTab from "../../../../../components/views/tabs/RequestTab";
import ShopListTab from "../../../../../components/views/tabs/ShoplistTab";
import ChoosenShopTab from "../../../../../components/views/tabs/ChoosenShopTab";

const RootScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "shop", title: "Shops" },
    { key: "choosen", title: "Choosen" },
  ]);

  const renderScene = SceneMap({
    shop: () => <ShopListTab />,
    choosen: () => <ChoosenShopTab />,
  });

  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">Shop Lists</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </ScreenLayout>
  );
};

export default RootScreen;
