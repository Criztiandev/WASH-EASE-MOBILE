import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";
import { Avatar, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const [status, setStatus] = useState("Ready");
  const [message, setMessage] = useState([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://github.com/shadcn.png",
      },
    },
  ]);

  const handleMessage = useCallback((currentMessage) => {
    setMessage((prev) => GiftedChat.append(prev, currentMessage));
  }, []);

  return (
    <View className="flex-1">
      {/* Content */}
      <View className="px-4 bg-white py-4">
        <Text className="text-md">Status</Text>
        <View className=" rounded-[5px]  border border-gray-300 bg-primary/90">
          <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}>
            <Picker.Item
              style={{ color: "white" }}
              label="Select Status"
              value=""
            />
            <Picker.Item label="Ready" value="ready" />
            <Picker.Item label="On Delivery" value="onDelivery" />
            <Picker.Item label="Delivered" value="delivered" />
            <Picker.Item label="Cancelled" value="canceled" />
          </Picker>
        </View>
      </View>

      <View className="bg-white flex-1" style={{ elevation: 2 }}>
        <GiftedChat
          messages={message}
          onSend={(message) => handleMessage(message)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </View>
  );
};

export default RootScreen;
