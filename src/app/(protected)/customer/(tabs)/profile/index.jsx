import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import NotificationIcon from "../../../../../assets/icons/notification_icon.svg";
import AccountIcon from "../../../../../assets/icons/account_icon.svg";
import Button from "../../../../../components/atoms/Button";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import accoutApi from "../../../../../api/accout.api";
import ProfileCard from "../../../../../components/molecule/cards/ProfileCard";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";

const ProfileScreen = () => {
  const { authState } = useAuthContext();
  const { id } = useLocalSearchParams();
  const { handleLogout } = useAuthContext();

  const { data, isLoading, isError } = useFetchUserData(authState?.user_id);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  const logoutMutation = useMutation({
    mutationFn: async () => await accoutApi.logout(),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Logout Successfully",
      });

      handleLogout();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onLogout = () => {
    logoutMutation.mutate({});
  };
  return (
    <ScreenLayout className="p-4 pt-6">
      <ProfileCard
        name={`${data?.firstName} ${data?.lastName}`}
        role={`${data?.role}`}
      />

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
        <Button onPress={onLogout}>Logout</Button>
      </View>
    </ScreenLayout>
  );
};

export default ProfileScreen;

const useFetchUserData = (id) => {
  return useQuery({
    queryFn: async () => {
      const result = await axios.get(`
      https://washease.online/api/get-customer-details/${id}`);

      const { first_name, last_name, email, phone_number, role } = result.data;

      return {
        id: id,
        firstName: first_name,
        lastName: last_name,
        email,
        phoneNumer: phone_number,
        role,
      };
    },
    queryKey: [`user-profile-${id}`],
  });
};
