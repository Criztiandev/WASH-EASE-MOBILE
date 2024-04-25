import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import ScreenLayout from "../../../../layout/ScreenLayout";
import SearchBar from "../../../../components/molecule/Searchbar";
import MapFrame from "../../../../components/atoms/MapFrame";
import { Link } from "expo-router";
import LaundryShopCardHorizontal from "../../../../components/organism/LaundryShopCardHorizontal";
import LaundryShopCardVertical from "../../../../components/organism/LaundryShopCardVertical";
import { Searchbar } from "react-native-paper";

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

const ChoosenShopScreen = () => {
  const renderSeparator = () => <View style={{ width: 24 }} />;

  return (
    <ScreenLayout className="bg-[#f0f0f0] px-2 space-y-4 ">
      <Searchbar className="bg-white mt-4" placeholder="Search" />

      <FlatList
        className="px-2 "
        data={MOCKDATA}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => (
          <LaundryShopCardVertical
            path={"/shop/dashboard/123123123"}
            {...item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </ScreenLayout>
  );
};

export default ChoosenShopScreen;
