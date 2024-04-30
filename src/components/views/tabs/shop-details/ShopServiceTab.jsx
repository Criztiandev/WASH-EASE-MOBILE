import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import HorizontalCard from "../../../molecule/HorizontalCard";
import { router } from "expo-router";

const ShopServiceTab = ({ services }) => {
  return (
    <View className="py-4">
      <ScrollView className="px-4">
        <TouchableOpacity
          onPress={() => router.push("/shop/service/self-service")}>
          <HorizontalCard
            image={
              "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            title={"Self Service"}
            description={
              "Efficient, clean, and user-friendly, our self-service laundry lets you handle your washing with high-efficiency machines. Perfect for the independent individual on the go."
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/shop/service/full-service")}>
          <HorizontalCard
            image={
              "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            title={"Full Service"}
            description={
              "Drop off your laundry and leave the rest to us! Our full-service option includes washing, drying, and folding. Ideal for busy lifestyles, get your clothes clean and ready without lifting a finger."
            }
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ShopServiceTab;
