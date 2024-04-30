import { View, Text, ScrollView } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import Timeline from "react-native-timeline-flatlist";

import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import Button from "../../../../../components/atoms/Button";

const ShopDetails = {
  name: "Shabu Houze",
  address: "Biringan Leyte",
  rating: 5.0,
  about:
    "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  opening: "5 AM - 6 PM",
  status: "Open",
};

const RooScreen = () => {
  const { id } = useLocalSearchParams();

  const data = [
    {
      time: "09:00",
      title: "Order Confirmed",
      description: "Your order has been Confirmed",
    },
    {
      time: "10:45",
      title: "Pickup Arranged",
      description: "Your order has been picked up.",
    },
    {
      time: "12:00",
      title: "In Process",
      description: "Your laundry task is in process",
    },
    {
      time: "14:00",
      title: "Shipped",
      description: "Your order is out for delivery.",
    },
    {
      time: "16:30",
      title: "Delivered",
      description: "Successfully delivered.",
    },
  ];

  return (
    <View className="flex-1">
      <ShopDetailsCover {...ShopDetails} />
      {/* // Delivery tracking // Messagening // Timeline */}

      <View className="flex-1">
        <Text className="font-bold text-xl m-4">Laundry Status</Text>
        <Timeline data={data} />
      </View>

      <View className="px-2">
        <Button onPress={() => router.push(`/shop/choosen/track/${id}`)}>
          <Text className={"text-lg text-center text-white font-bold"}>
            Track
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default RooScreen;
