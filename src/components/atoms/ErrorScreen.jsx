import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, IconButton } from "react-native-paper";
import ErrorIcon from "../../assets/icons/warning.png";
import { Image } from "expo-image";

const ErrorScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[##feca57] justify-center items-center">
        <Image
          source={require("../../assets/icons/warning.png")}
          contentFit="cover"
          transition={1000}
          style={{ width: 120, height: 120 }}
        />
        <Text className="text-[24px] text-center ">
          Error: Something went wrong, Please Try again
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
