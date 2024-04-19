import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import ScreenLayout from "../../../../layout/ScreenLayout";
import { Link, router } from "expo-router";

const OtherInfo = [
  {
    id: 1,
    icon: <View className="w-[64px] h-[64px] border rounded-full"></View>,
    title: "Account info",
    path: "/account/23232323",
  },

  {
    id: 2,
    icon: <View className="w-[64px] h-[64px] border rounded-full"></View>,
    title: "Notification",
    path: "/notification/232323",
  },

  {
    id: 3,
    icon: <View className="w-[64px] h-[64px] border rounded-full"></View>,
    title: "Transaction History",
    path: "/history/123123123",
  },

  {
    id: 4,
    icon: <View className="w-[64px] h-[64px] border rounded-full"></View>,
    title: "Delivery Tracking",
    path: "/delivery/123123123",
  },

  {
    id: 5,
    icon: <View className="w-[64px] h-[64px] border rounded-full"></View>,
    title: "Laundary Status",
    path: "/Laundary/123123123123",
  },
  {
    id: 6,
    icon: <View className="w-[64px] h-[64px] border rounded-full"></View>,
    title: "Sign out",
    path: "/signout/123123123123",
  },
];

const ProfileScreen = () => {
  return (
    <ScreenLayout className="p-2">
      <View className="w-[64px] h-[64px] border rounded-full mb-4"></View>
      <View className="mb-2">
        <Text className="text-[18px] font-semibold">Profile</Text>
      </View>

      <View className="p-4 border rounded-md flex-row space-x-4 items-center">
        <View className="w-[84px] h-[84px] border rounded-full"></View>
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="font-bold text-[24px]">Customer name</Text>
        </View>
      </View>

      <Text className="text-[18px] font-semibold mt-4 mb-2">Other</Text>
      <FlatList
        data={OtherInfo}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.replace(item.path)}>
            <View className="px-4 py-2 border rounded-md flex-row space-x-4 items-center">
              {item.icon}
              <Text className="font-semibold text-[18px]">{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScreenLayout>
  );
};

export default ProfileScreen;
