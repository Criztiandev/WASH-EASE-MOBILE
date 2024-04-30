import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import ScreenLayout from "../../../../layout/ScreenLayout";
import Button from "../../../../components/atoms/Button";
import { Avatar, Card, Icon } from "react-native-paper";
import AccountIcon from "../../../../assets/icons/account_icon.svg";
import NotificationIcon from "../../../../assets/icons/notification_icon.svg";
import { router, useLocalSearchParams } from "expo-router";
import FloationActionBtn from "../../../../components/atoms/FloationActionBtn";

const ProfileScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScreenLayout className="p-2">
      <ProfileCard />

      {/* Navigation */}

      <TouchableOpacity
        onPress={() => {
          router.push(`/account/profile/details/${id}`);
        }}>
        <View className=" flex-row items-center space-x-4 p-4 rounded-[5px] bg-white shadow-md border border-gray-300">
          <AccountIcon width={32} height={32} className="" />
          <Text className="text-lg font-bold">Account Information</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push(`/account/profile/notification/${id}`);
        }}>
        <View className=" flex-row items-center space-x-4 p-4 rounded-[5px] bg-white shadow-md border border-gray-300">
          <NotificationIcon width={32} height={32} className="" />
          <Text className="text-lg font-bold">Notification</Text>
        </View>
      </TouchableOpacity>

      <FloationActionBtn className="bg-red-400" label={"Logout"} />
    </ScreenLayout>
  );
};

export default ProfileScreen;

const ProfileCard = () => {
  return (
    <>
      <Text className="text-xl font-bold mb-2">Profile</Text>
      <Card className="bg-white mb-4">
        <Card.Content className="flex-row space-x-4">
          <Avatar.Icon />
          <View>
            <Text className="text-lg font-bold">
              Criztian Jade Mitra Tuplano
            </Text>
            <Text>Customer</Text>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};
