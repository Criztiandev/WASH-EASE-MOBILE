import React from "react";
import { View, Text } from "react-native";

import ScreenLayout from "../../../../layout/ScreenLayout";
import Button from "../../../../components/atoms/Button";
import { router } from "expo-router";

const SucessScreen = () => {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <View>
        <View className="w-[200px] h-[200px] border rounded-[5px]"></View>
        <Text className="text-[24px] font-bold text-center my-4">
          Laundy Placed
        </Text>
      </View>

      <Button
        onPress={() => router.push("/customer/home")}
        className={"w-[200px]"}>
        Back to Home
      </Button>
    </View>
  );
};

export default SucessScreen;
