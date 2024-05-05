import { View, FlatList, Text } from "react-native";
import { Icon, Searchbar } from "react-native-paper";
import React, { useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import LaundryShopCardVertical from "../../../../../components/organism/LaundryShopCardVertical";

const MOCKDATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image:
      "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    customer: 40,
    address: "Kahit saan",
    status: "open",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: 30,
    address: "Kahit dito",
    status: "open",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image:
      "https://images.pexels.com/photos/13696491/pexels-photo-13696491.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    customer: 20,
    address: "Kahit dyaan",
    status: "close",
  },
];

const RootScreen = () => {
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
      <View className="px-4 pt-4">
        <Text className="text-2xl font-bold">Tasks</Text>
      </View>

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
              {...item}
              path={`/rider/task/details/${item.id}`}>
              <View className="flex-row items-center space-x-2">
                <Icon size={24} source={"information"} className="border" />
                <Text className="text-md font-bold">
                  {item.customer} Customer
                </Text>
              </View>

              <View className="flex-row items-center space-x-2">
                <Icon
                  size={24}
                  source={"office-building-marker"}
                  className="border"
                />
                <Text className="text-md font-bold">
                  {item.address || "Location"}
                </Text>
              </View>
            </LaundryShopCardVertical>
          )}
        />
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
