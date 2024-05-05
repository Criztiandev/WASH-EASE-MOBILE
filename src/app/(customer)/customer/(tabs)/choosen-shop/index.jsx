import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { SceneMap, TabView } from "react-native-tab-view";

import LaundryShopCard from "../../../../../components/organism/LaundryShopCardHorizontal";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import RequestTab from "../../../../../components/views/tabs/shop-details/RequestTab";

const MOCKDATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image:
      "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    details: {
      location: "Kahit saan",
      schedule: "3:00 - 4:00 PM",
    },
    status: "open",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "Kahit Dito",
      schedule: "4:00 - 4:00 PM",
    },
    status: "open",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image:
      "https://images.pexels.com/photos/13696491/pexels-photo-13696491.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    details: {
      location: "Kahit Paraan",
      schedule: "3:00 - 4:00 PM",
    },
    status: "close",
  },
];

const RootScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "shop", title: "Shops" },
    { key: "request", title: "Request" },
  ]);

  const renderScene = SceneMap({
    shop: () => <ShopListTab />,
    request: () => <RequestTab />,
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

const ShopListTab = () => {
  return (
    <View className="px-2 flex-1">
      <Searchbar className="bg-white my-4" placeholder="Search" />

      <View className="flex-1">
        <FlashList
          data={MOCKDATA}
          renderItem={({ item }) => (
            <LaundryShopCard
              path={`/shop/choosen/details/${item.id}`}
              {...item}
            />
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
