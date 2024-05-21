import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SceneMap } from "react-native-tab-view";
import Timeline from "react-native-timeline-flatlist";

import ShopReviewTabs from "../../../../../components/views/tabs/ShopReviewTabs";
import ShopServiceOfferTab from "../../../../../components/views/tabs/ShopServiceOfferTab";
import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import AboutTab from "../../../../../components/views/tabs/AboutTab";
import { Avatar, Icon, IconButton } from "react-native-paper";
import RequestHeader from "../../../../../components/molecule/header/RequestHeader";
import Button from "../../../../../components/atoms/Button";
import ProfileCard from "../../../../../components/molecule/cards/ProfileCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "../../../../../context/AuthContext";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";

const RequestScreen = () => {
  const { authState } = useAuthContext();
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
  const statusMap = {
    PENDING: "Order Confirmed",
    PROCESSING: "In Process",
    "READY FOR PICKUP": "Pickup Arranged",
    COMPLETED: "Delivered",
  };

  const {
    data: payload,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        `https://washease.online/api/laundry-shop/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      return result.data;
    },
    queryKey: [`shop-transaction-details-${id}`],
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <View className="flex-1">
      <View className="px-4 flex-row justify-between items-center">
        <Text className="text-xl font-bold mt-4">Laundry Status</Text>
      </View>

      <View className="flex-1 m-4  border border-gray-300 bg-white rounded-[5px] p-4">
        <View className="flex-1">
          <Timeline data={timeline} />
        </View>
      </View>

      <View className="px-4 pb-4">
        <ProfileCard name="Critian Jade Mitra Tuplano" role="Delivery Rider" />
        <View></View>
        <View>
          {payload?.data?.status === "COMPLETED" ? (
            <Button disabled>Completed</Button>
          ) : (
            <Button
              onPress={() =>
                router.push(`/customer/message/${payload.data?.rider_id || 2}`)
              }>
              Message
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default RequestScreen;
