import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

import ScreenLayout from "../../../../../layout/ScreenLayout";
import MessageCard from "../../../../../components/molecule/cards/MessageCard";
import { GiftedChat } from "react-native-gifted-chat";
import Button from "../../../../../components/atoms/Button";
import { ArrowLeft } from "lucide-react-native";

const MOCKDATA = [
  {
    id: 0,
    fullName: "Carlos Santiago",
    lastMessageSent: "Nasa harap na ako ng bahay niyo. Labas na po kayo Sir.",
    unreadCount: 0,
  },
  {
    id: 1,
    fullName: "Maria Lopez",
    lastMessageSent: "On the way na po, mga 10 minutes po nandiyan na ako.",
    unreadCount: 0,
  },
  {
    id: 2,
    fullName: "Sofia Rodriguez",
    lastMessageSent:
      "Traffic lang po konti, mga 5 minutes pa po bago ako makarating.",
    unreadCount: 0,
  },
  {
    id: 3,
    fullName: "Elena Marquez",
    lastMessageSent: "Papunta na po ako.",
    unreadCount: 0,
  },
  {
    id: 4,
    fullName: "Jose Hernandez",
    lastMessageSent: "Papasok na ako sa street niyo. Wait niyo po ako.",
    unreadCount: 0,
  },
  {
    id: 5,
    fullName: "Lucia Mendoza",
    lastMessageSent: "Andito na ako sa may gate niyo.",
    unreadCount: 0,
  },
  {
    id: 6,
    fullName: "Pedro Ramos",
    lastMessageSent:
      "Nakuha ko na po yung laundry niyo. Message na lang po ako pag malapit na.",
    unreadCount: 0,
  },
  {
    id: 7,
    fullName: "Isabella Cruz",
    lastMessageSent: "Hi, nasa harap na ako ng bahay niyo.",
    unreadCount: 0,
  },
  {
    id: 8,
    fullName: "Miguel Santos",
    lastMessageSent:
      "Na pick up ko na po yung laundry niyo Sir. Papunta na po ako diyan.",
    unreadCount: 0,
  },
  {
    id: 9,
    fullName: "Ana Gomez",
    lastMessageSent: "Please prepare your payment maam. 210 pesos po lahat.",
    unreadCount: 0,
  },
];

const RootScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(MOCKDATA);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://github.com/shadcn.png",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(MOCKDATA);
    } else {
      setFilteredData(
        MOCKDATA.filter((item) =>
          item.fullName.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Here you would typically fetch the chat history for this user
    // For now, we'll just set a welcome message
    setMessages([
      {
        _id: 1,
        text: `${user.lastMessageSent}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: user.fullName,
          avatar: "https://github.com/shadcn.png",
        },
      },
    ]);
  };

  if (selectedUser) {
    return (
      <ScreenLayout>
        <View className="flex-1">
          <View className="p-4 bg-primary flex flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => handleUserSelect("")}>
              <ArrowLeft color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">
              {selectedUser.fullName}
            </Text>
          </View>
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View className="px-2 flex-1">
        <Text className="text-2xl pt-4 px-4 font-bold">Message</Text>
        <Searchbar
          className="bg-white my-4"
          placeholder="Search"
          value={searchQuery}
          onChangeText={onChangeSearch}
        />

        <View className="flex-1">
          <FlashList
            data={filteredData}
            renderItem={({ item }) => (
              <MessageCard
                onPress={() => handleUserSelect(item)}
                userName={item.fullName}
                {...item}
              />
            )}
            estimatedItemSize={200}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
