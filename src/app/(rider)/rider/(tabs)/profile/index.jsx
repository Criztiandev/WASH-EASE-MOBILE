import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import NotificationIcon from "../../../../../assets/icons/notification_icon.svg";
import AccountIcon from "../../../../../assets/icons/account_icon.svg";
import Button from "../../../../../components/atoms/Button";
import Toast from "react-native-toast-message";
import { useSetAtom } from "jotai";
import { AuthAtoms } from "../../../../(auth)";

const ProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const setAuthAtom = useSetAtom(AuthAtoms);

  const handleLogout = () => {
    Toast.show({
      type: "success",
      text1: "Logout Successfully",
    });

    router.push("/auth/sign-in");
    setAuthAtom("");
  };
  return (
    <ScreenLayout className="p-4 pt-6">
      <ProfileCard />

      <TouchableOpacity
        onPress={() => {
          router.push(`/account/details/${id}`);
        }}>
        <View className=" flex-row items-center space-x-4 p-4 rounded-[5px] bg-white shadow-md border border-gray-300">
          <AccountIcon width={32} height={32} className="" />
          <Text className="text-lg font-bold">Account Information</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push(`/account/notification/${id}`);
        }}>
        <View className=" flex-row items-center space-x-4 p-4 rounded-[5px] bg-white shadow-md border border-gray-300">
          <NotificationIcon width={32} height={32} className="" />
          <Text className="text-lg font-bold">Notification</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push(`/account/transaction/${id}`);
        }}>
        <View className=" flex-row items-center space-x-4 p-4 rounded-[5px] bg-white shadow-md border border-gray-300">
          <NotificationIcon width={32} height={32} className="" />
          <Text className="text-lg font-bold">Transaction History</Text>
        </View>
      </TouchableOpacity>

      <View className="my-4">
        <Button onPress={handleLogout}>Logout</Button>
      </View>
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
