import { View, Text, FlatList } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import LaundryShopCardVertical from "../../../../components/organism/LaundryShopCardVertical";

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
  const renderSeparator = () => <View style={{ width: 24 }} />;

  return (
    <View className="px-2 space-y-4 mt-4">
      <View>
        <Searchbar className="bg-white" placeholder="Search" />
      </View>

      <FlatList
        data={MOCKDATA}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => (
          <LaundryShopCardVertical
            path={`/shop/details/${item.id}`}
            {...item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;
