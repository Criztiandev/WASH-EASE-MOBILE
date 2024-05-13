import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DestinationMap from "../../../../../components/organism/DestionationMap";
import { Avatar, Icon } from "react-native-paper";
import { router } from "expo-router";
import LocationIcon from "../../../../../assets/icons/location_icon.svg";
import LaundryShopIcon from "../../../../../assets/icons/shop_icon.svg";
import Button from "../../../../../components/atoms/Button";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import { Picker } from "@react-native-picker/picker";

const DashboardScreen = () => {
  const [deliveryStatus, setDeliveryStatus] = useState("");
  return (
    <ScreenLayout>
      <View className="flex-1">
        <DestinationMap data={[{}]} height={430} />

        <View className="flex-1 border p-4 mb">
          <View className="p-3 space-y-4">
            <View className="flex-row items-center space-x-2">
              <Avatar.Icon />
              <Text
                variant="titleLarge"
                className="font-bold text-xl"
                style={{ flexShrink: 1 }}>
                Criztian Jade M Tuplano
              </Text>
            </View>

            <View className="opacity-50 space-y-2">
              <View
                className="flex-row items-center "
                style={{ flexShrink: 1 }}>
                <View className="mr-2">
                  <LocationIcon />
                </View>
                <Text className="text-[16px]" style={{ flexShrink: 1 }}>
                  Barangay Pinugay kahit saan di magiba
                </Text>
              </View>

              <View
                className="flex-row items-center "
                style={{ flexShrink: 1 }}>
                <View className="mr-2">
                  <LaundryShopIcon />
                </View>
                <Text className="text-[16px]" style={{ flexShrink: 1 }}>
                  ShabuX Laundry Shop
                </Text>
              </View>

              <View className="flex-row items-center ">
                <View className="mr-2">
                  <Icon source={"information"} size={24} />
                </View>
                <Text className="text-[16px]">On process</Text>
              </View>
            </View>

            <View className="border border-gray-400 rounded-[5px]">
              <Picker
                selectedValue={deliveryStatus}
                onValueChange={(value) => setDeliveryStatus(value)}>
                <Picker.Item label="Status" value="" />
                <Picker.Item label="On Process" value="on-process" />
                <Picker.Item label="On Pickup" value="on-pickup" />
                <Picker.Item label="Delivered" value="delivered" />
                <Picker.Item label="Out of delover" value="out-of-delivery" />
              </Picker>
            </View>

            <Button
              onPress={() =>
                router.push(`rider/task/dashboard/message/${12313123}`)
              }>
              Message
            </Button>
          </View>
        </View>
      </View>

      <View className="absolute top-0 right-0 mt-12 mr-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-[36px] h-[36px]  rounded-full flex justify-center items-center bg-red-300">
          <Icon source="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default DashboardScreen;
