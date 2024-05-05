import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import HorizontalCard from "../../molecule/HorizontalCard";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import LaundryShopCardVertical from "../../molecule/cards/LaundryShopCardVertical";

const MOCKDATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Pick up Delivery",
    image:
      "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    details: {
      location: "Kahit saan",
      schedule: "3:00 - 4:00 PM",
    },
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Pick up Delivery",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "Kahit Dito",
      schedule: "4:00 - 4:00 PM",
    },
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Pick up",
    image:
      "https://images.pexels.com/photos/13696491/pexels-photo-13696491.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    details: {
      location: "Kahit Paraan",
      schedule: "3:00 - 4:00 PM",
    },
  },
];

const RequestTab = () => {
  return (
    <View className="flex-1 my-4">
      <FlashList
        data={MOCKDATA}
        renderItem={({ item }) => (
          <View className="px-4 ">
            <LaundryShopCardVertical
              path={`/shop/choosen/request/${item.id}`}
              {...item}
            />
          </View>
        )}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RequestTab;
