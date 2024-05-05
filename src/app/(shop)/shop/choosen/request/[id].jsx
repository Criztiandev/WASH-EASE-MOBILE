import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SceneMap } from "react-native-tab-view";
import Timeline from "react-native-timeline-flatlist";

import ShopReviewTabs from "../../../../../components/views/tabs/ShopReviewTabs";
import ShopServiceOfferTab from "../../../../../components/views/tabs/ShopServiceOfferTab";
import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import AboutTab from "../../../../../components/views/tabs/AboutTab";
import { Avatar, IconButton } from "react-native-paper";
import RequestHeader from "../../../../../components/molecule/message/RequestHeader";

const Details = {
  name: "Shabu Houze",
  address: "Biringan Leyte",
  rating: 5.0,
  about:
    "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  opening: "5 AM - 6 PM",
  status: "Open",
};

const RequestScreen = () => {
  const { id } = useLocalSearchParams();
  const timeline = [
    {
      time: "09:00",
      title: "Order Confirmed",
      description: "Your order has been Confirmed",
    },
    {
      time: "10:45",
      title: "Pickup Arranged",
      description: "our order has been picked up",
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
      <ShopDetailsCover {...Details} />

      <View className="p-4">
        <RequestHeader id={id} name={"Geral Suarez"} status={"Online"} />
      </View>

      <View className="flex-1 mx-4 border border-gray-300 bg-white p-4 rounded-[5px]">
        <Timeline data={timeline} />
      </View>
    </View>
  );
};

export default RequestScreen;
