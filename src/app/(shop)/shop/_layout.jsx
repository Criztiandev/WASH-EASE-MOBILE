import { View, Text } from "react-native";
import React, { useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="choosen" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerRight: () => {
            const [isSelected, setIsSelected] = useState(false);
            const { id } = useLocalSearchParams();
            return (
              <View className="flex-row space-x-2">
                <IconButton
                  icon={"message"}
                  onPress={() => router.push(`/shop/choosen/message/${id}`)}
                />
                {!isSelected && (
                  <IconButton
                    icon={"check"}
                    onPress={() =>
                      Toast.show({
                        type: "success",
                        text1: "Selected Successfully",
                      })
                    }
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Stack.Screen name="lists" />
      <Stack.Screen name="service" options={{ title: "Service" }} />
    </Stack>
  );
};

export default RootLayout;
