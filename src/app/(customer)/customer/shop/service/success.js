import React from "react";
import { View, Text } from "react-native";

import ScreenLayout from "../../../../../layout/ScreenLayout";
import Button from "../../../../../components/atoms/Button";
import { router } from "expo-router";

const SucessScreen = () => {
  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center gap-4">
        <View>
          <View className="w-[200px] h-[200px] border rounded-[5px]"></View>
          <Text className="text-[24px] font-bold text-center my-4">
            Laundy Placed
          </Text>
        </View>

        <Button onPress={() => router.push("/home")}>
          <Text className="font-bold text-center text-[18px] text-white">
            Back to Home
          </Text>
        </Button>
      </View>
    </ScreenLayout>
  );
};

export default SucessScreen;
