import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[##feca57] justify-center items-center">
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
