import { View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import { FlashList } from "@shopify/flash-list";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router } from "expo-router";

const MOCKDATA = [
  {
    id: 0,
    title: "M&L Laundry Hub Katuparan",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "88 3rd St Taguig, Metro Manila",
      schedule: "7:00 AM - 8:00 PM",
    },
    status: "open",
  },
  {
    id: 1,
    title: "M&L Laundry Hub Pinagsama",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: " Phase 2, Balai Magayon, Taguig, Metro Manila",
      schedule: "7:00 AM - 7:00 PM",
    },
    status: "open",
  },

  {
    id: 2,
    title: "LABAsics Laundry House North Signal",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "44 Sampaloc Extension, Taguig, Metro Manila",
      schedule: ": 7:00 AM - 8:00 PM",
    },
    status: "open",
  },

  {
    id: 3,
    title: "Instawash Laundry Shop",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: " Unit A5 & A6, Block 10 Lot 11, Taguig",
      schedule: ": 9:00 AM - 5:00 PM",
    },
    status: "close",
  },
];

const ShoplistScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(MOCKDATA);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const filterData = (searchText) => {
    const formattedQuery = searchText.toLowerCase();
    const filteredData = MOCKDATA.filter((item) => {
      return (
        item.title.toLowerCase().includes(formattedQuery) ||
        item.details.location.toLowerCase().includes(formattedQuery) ||
        item.details.schedule.toLowerCase().includes(formattedQuery) ||
        item.status.toLowerCase().includes(formattedQuery)
      );
    });

    setFilteredData(filteredData);
  };

  return (
    <ScreenLayout>
      <View className="flex-1">
        <View className="px-4 my-4">
          <Searchbar
            placeholder="Search"
            className="bg-white"
            onChangeText={() => console.log("hi")}
          />
        </View>
        <View className="flex-1">
          <FlashList
            data={filteredData}
            estimatedItemSize={200}
            renderItem={({ item }) => (
              <HeroShopCard
                {...item}
                label={"View details"}
                onNavigate={() => router.push(`/shop/details/${item.id}`)}
              />
            )}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default ShoplistScreen;
