import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import ScreenLayout from "../../../layout/ScreenLayout";
import { Link, useLocalSearchParams } from "expo-router";
import CloseIncon from "../../../assets/icons/close_icon.svg";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";

const AccountProfileScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScreenLayout className="">
      <ScrollView className="p-4 ">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-[24px] ">Account Info</Text>
          <Link href={"/home"} className="p-2 border rounded-full">
            <CloseIncon />
          </Link>
        </View>

        <View className="flex justify-center items-center">
          <TouchableOpacity onPress={() => {}}>
            <View className="w-[200px] h-[200px] border rounded-full mx-auto my-4"></View>
          </TouchableOpacity>
          <Text className="text-[18px] font-bold">Updload Photo</Text>
        </View>

        <View className="space-y-4">
          <View className="space-y-4">
            <Input label={"First Name"} variant={"outline"} />
            <Input label={"Last Name"} variant={"outline"} />
            <Input label={"Address"} variant={"outline"} />
            <Input label={"Phone number"} variant={"outline"} />
            <Input label={"Password"} variant={"outline"} />
          </View>

          <View className="mb-8">
            <Button>
              <Text className="text-[18px] text-white font-bold text-center">
                Update
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default AccountProfileScreen;
