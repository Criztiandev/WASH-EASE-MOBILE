import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const RootScreen = () => {
  return <Redirect href={"customer/(tabs)/home"} />;
};

export default RootScreen;
