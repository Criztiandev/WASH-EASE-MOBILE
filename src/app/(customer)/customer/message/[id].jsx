import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";
import { Avatar, IconButton } from "react-native-paper";

const RootScreen = () => {
  const { id } = useLocalSearchParams();
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
