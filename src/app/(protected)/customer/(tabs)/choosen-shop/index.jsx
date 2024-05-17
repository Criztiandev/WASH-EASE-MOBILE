import React from "react";
import { Text, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router } from "expo-router";
import { Searchbar } from "react-native-paper";

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

const RootScreen = () => {
  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">Selected Shops</Text>

      <Searchbar
        placeholder="Search"
        className="bg-white mx-4"
        onChangeText={() => console.log("hi")}
      />
      <View className="flex-1 my-4">
        <FlashList
          data={MOCKDATA}
          renderItem={({ item }) => (
            <View className="">
              <HeroShopCard
                {...item}
                label={"View details"}
                onNavigate={() =>
                  router.push(`/shop/choosen/request/${item.id}`)
                }
              />
            </View>
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
