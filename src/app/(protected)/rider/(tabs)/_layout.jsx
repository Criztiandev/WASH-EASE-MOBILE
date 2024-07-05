import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { Icon } from "react-native-paper";

import LightSearchIcon from "../../../../assets/icons/light_search_icon.svg";
import DarkSearchIcon from "../../../../assets/icons/dark_search_icon.svg";

import LightTruckIcon from "../../../../assets/icons/light_truck_icon.svg";
import DarkTruckIcon from "../../../../assets/icons/dark_truck_icon.svg";

import LighHomeIcon from "../../../../assets/icons/light_home_icon.svg";
import DarkHomeIcon from "../../../../assets/icons/dark_home_icon.svg";

import LightChatIcon from "../../../../assets/icons/light_chat_icon.svg";
import DarkChatIcon from "../../../../assets/icons/dark_chat_icon.svg";

import LightProfileIcon from "../../../../assets/icons/light_profile_icon.svg";
import DarkProfileIcon from "../../../../assets/icons/dark_profile_icon.svg";
import { cn } from "../../../../utils/dev.utils";

const HomeTab = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 84,
          elevation: 0,
          shadowColor: "#ccccc",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              className={cn(
                `items-center justify-center mt-4 ${!focused && "opacity-50"}`
              )}
            >
              {focused ? <DarkHomeIcon /> : <LighHomeIcon />}
              <Text>Home</Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              className={cn(
                `items-center justify-center mt-4 ${!focused && "opacity-50"}`
              )}
            >
              {focused ? <DarkChatIcon /> : <LightChatIcon />}
              <Text>Message</Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              className={cn(
                `items-center justify-center mt-4 ${!focused && "opacity-50"}`
              )}
            >
              {focused ? <DarkProfileIcon /> : <LightProfileIcon />}
              <Text>Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default HomeTab;
