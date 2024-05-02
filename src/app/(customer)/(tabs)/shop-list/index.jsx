import { View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import React, { useState } from "react";
import ScreenLayout from "../../../../layout/ScreenLayout";
import SearchBar from "../../../../components/molecule/Searchbar";
import MapFrame from "../../../../components/atoms/MapFrame";
import { Link } from "expo-router";
import LaundryShopCardHorizontal from "../../../../components/organism/LaundryShopCardHorizontal";

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

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const renderSeparator = () => <View style={{ width: 8 }} />;

  return (
    <ScreenLayout className="bg-[#f0f0f0]">
      <ScrollView className="px-[16px] pt-[16px] space-y-4">
        <Link
          href={"../../shop/lists"}
          className=" py-4 px-8 rounded-full bg-white mb-4"
          asChild>
          <Text className="justify-start text-[18px]" variant="">
            Search here
          </Text>
        </Link>

        <MapFrame />

        <Text variant="titleLarge" className="font-bold">
          Nearby Laundy shops
        </Text>
        <View className="">
          <FlatList
            horizontal
            data={MOCKDATA}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({ item }) => <LaundryShopCardHorizontal {...item} />}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default HomeScreen;
