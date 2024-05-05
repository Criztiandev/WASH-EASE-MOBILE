import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Icon, Searchbar } from "react-native-paper";
import CustomerReviewCard from "../../../../components/molecule/cards/CustomerReviewCard";

const MOCKDATA = [
  {
    id: "12321123",
    name: "Shop ng Shabu",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "123212323",
    name: "I miss you",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "1232231223",
    name: "Balik kana",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "12322313123",
    name: "Miss na kita",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },
];

const RootScreen = () => {
  const [searchedItems, setSearchedItems] = useState(MOCKDATA);

  const handleSearch = (value) => {
    const query = value.toLowerCase();
    const filteredData = MOCKDATA.filter((item) =>
      item.title.toLocaleLowerCase().includes(query)
    );
    setSearchedItems(filteredData);
  };

  return (
    <View className="flex-1 ">
      <View className="flex-1 py-4">
        <Searchbar
          onChangeText={handleSearch}
          className="mb-4 bg-white mx-4"
          placeholder="Search here"
        />
        <FlashList
          data={searchedItems}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/shop/choosen/order-details/${item.id}`)
              }>
              <View className="mx-4 border bg-green-300/50 border-green-500 rounded-[5px] overflow-hidden mb-4">
                <CustomerReviewCard {...item} />
              </View>
            </TouchableOpacity>
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default RootScreen;
