import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import ShopServiceDetailCard from "../../molecule/ShopServiceDetailCard";
import { Icon, IconButton } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

const MOCKDATA = [
  {
    id: "0",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Regular Wash",
    price: "70.00",
    timer: 38,
    description: `KG: Regular Clothes (Max of 7kgs) , Maong Pants & Thick Jackets (Max of 6kgs)`,
  },

  {
    id: "1",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Premium Wash",
    price: "75.00",
    timer: 48,
    description: `Regular Clothes (Max of 7kgs) , Maong Pants & Thick Jackets (Max of 6kgs)`,
  },

  {
    id: "2",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Regular Dry",
    price: "70.00",
    timer: 30,
    description: `Regular Clothes (Max of 7kgs) , Maong Pants & Thick Jackets (Max of 6kgs)`,
  },

  {
    id: "3",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Premium Dry",
    price: "75.00",
    timer: 40,
    description: `Regular Clothes (Max of 7kgs) , Maong Pants & Thick Jackets (Max of 6kgs)`,
  },

  {
    id: "4",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Fold",
    price: "40.00",
    description: "Per kilo",
  },
  {
    id: "5",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Bedsheets/Curtains",
    price: "55.00/kg",
    description: "per kilo",
  },
  {
    id: "6",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Blanket/Towel",
    price: "55.00/kg",
    description: "per kilo",
  },

  {
    id: "7",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Comforter",
    price: "85.00/KG",
    description: "per kilo",
  },
  {
    id: "8",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Full Service",
    price: 200,
  },
];

const ShopServiceOfferTab = () => {
  const [selectedService, setSelectedService] = useState("");

  const handleSelect = () => {
    const currentTitle = selectedService?.title.replace(" ", "-");
    if (!currentTitle) return;

    setIsToggle(false);
    router.push(`/shop/service/${currentTitle.toLowerCase()}`);
  };

  return (
    <>
      <View className="flex-1 pb-4">
        <FlashList
          data={MOCKDATA}
          renderItem={({ item }) => <ShopServiceDetailCard {...item} />}
          estimatedItemSize={200}
          keyExtractor={(items) => items.id}
          className="mx-4"
        />
      </View>
    </>
  );
};

export default ShopServiceOfferTab;
