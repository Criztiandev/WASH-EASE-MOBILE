import React from "react";
import { Stack, Tabs } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function UserLayout({ navigation }) {
  // check session here

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Your stack screens go here */}
    </Stack>
  );
}
