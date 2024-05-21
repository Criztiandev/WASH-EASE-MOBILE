import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ErrorScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[##feca57] justify-center items-center">
        <Text>Error: Something went wrong, Please Try again</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
