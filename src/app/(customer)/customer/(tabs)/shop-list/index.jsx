import { View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import LaundryShopCardVertical from "../../../../../components/organism/LaundryShopCardVertical";

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

    console.log(filteredData);
    setFilteredData(filteredData);
  };

  const renderSeparator = () => <View style={{ width: 8 }} />;

  return (
    <ScreenLayout className="bg-[#f0f0f0]">
      <View className="px-[16px] pt-[16px] space-y-4">
        <Searchbar
          placeholder="Search"
          className="bg-white"
          onChangeText={() => console.log("hi")}
        />
        <FlatList
          data={filteredData}
          ItemSeparatorComponent={renderSeparator}
          renderItem={({ item }) => (
            <LaundryShopCardVertical
              path={`/shop/details/${item.id}`}
              {...item}
            />
          )}
        />
      </View>
    </ScreenLayout>
  );
};

export default ShoplistScreen;
