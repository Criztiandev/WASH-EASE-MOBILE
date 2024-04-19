import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import HorizontalCard from "../../molecule/HorizontalCard";
import { router } from "expo-router";

const ShopServiceTab = () => {
  return (
    <View className="py-4">
      <ScrollView className="px-4">
        <TouchableOpacity
          onPress={() => router.replace("/shop/service/select-machine")}>
          <HorizontalCard
            image={
              "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            title={"Self Service"}
            description={
              "Our self service option \n provides  customers to \n handle their  laundry with \n their  own terms."
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <HorizontalCard
            image={
              "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            title={"Pickup and Delivery"}
            description={
              "Offering convenient pickup and\ndelivery services for\nyour laundry needs"
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <HorizontalCard
            image={
              "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            title={"Pickup Only"}
            description={"Convenient pickup-only mode\nfor customers on the go"}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ShopServiceTab;
