import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

import ScreenLayout from "../../../../../layout/ScreenLayout";
import MessageCard from "../../../../../components/molecule/cards/MessageCard";

const MOCKDATA = [
  {
    id: 0,
    fullName: "Maria Cruz Delos Reyes",
    lastMessageSent: "Andito na po ako banda Biringan Highschool po",
    unreadCount: 44,
  },
  {
    id: 1,
    fullName: "Juan Pablo Miras",
    lastMessageSent: "Will check and confirm ASAP.",
    unreadCount: 12,
  },
  {
    id: 2,
    fullName: "Lucy Chen",
    lastMessageSent: "That's great! Looking forward to it.",
    unreadCount: 9,
  },
  {
    id: 3,
    fullName: "Amir Basra",
    lastMessageSent: "Meeting rescheduled to 3 PM.",
    unreadCount: 5,
  },
  {
    id: 4,
    fullName: "Sara Al-Amri",
    lastMessageSent: "Can you send the files again?",
    unreadCount: 22,
  },
  {
    id: 5,
    fullName: "Clara Smithson",
    lastMessageSent: "I'll see you at the usual place.",
    unreadCount: 1,
  },
  {
    id: 6,
    fullName: "Dmitri Yang",
    lastMessageSent: "Flight landed an hour ago.",
    unreadCount: 14,
  },
  {
    id: 7,
    fullName: "Olivia Dunham",
    lastMessageSent: "Sorry, can't talk right now.",
    unreadCount: 7,
  },
  {
    id: 8,
    fullName: "Ethan Tremblay",
    lastMessageSent: "Let's discuss tomorrow.",
    unreadCount: 19,
  },
  {
    id: 9,
    fullName: "Mia Tang",
    lastMessageSent: "Please confirm once you receive this message.",
    unreadCount: 31,
  },
  {
    id: 10,
    fullName: "Noah Clarke",
    lastMessageSent: "Can we postpone our meeting?",
    unreadCount: 2,
  },
  {
    id: 11,
    fullName: "Sophia Loren",
    lastMessageSent: "Loved the presentation, thanks!",
    unreadCount: 18,
  },
  {
    id: 12,
    fullName: "Liam Neeson",
    lastMessageSent: "I'm on my way.",
    unreadCount: 10,
  },
  {
    id: 13,
    fullName: "Emma Goldman",
    lastMessageSent: "The document is approved.",
    unreadCount: 3,
  },
  {
    id: 14,
    fullName: "Ava Fielding",
    lastMessageSent: "Can we talk?",
    unreadCount: 25,
  },
  {
    id: 15,
    fullName: "Mason Ray",
    lastMessageSent: "How's everything going?",
    unreadCount: 13,
  },
  {
    id: 16,
    fullName: "Isabella Knight",
    lastMessageSent: "Happy Birthday!",
    unreadCount: 21,
  },
  {
    id: 17,
    fullName: "Jacob Elordi",
    lastMessageSent: "Missing the documents.",
    unreadCount: 16,
  },
  {
    id: 18,
    fullName: "Madison Hu",
    lastMessageSent: "Caught in traffic, will be late.",
    unreadCount: 8,
  },
  {
    id: 19,
    fullName: "Elijah Wood",
    lastMessageSent: "Are we still on for tonight?",
    unreadCount: 29,
  },
  {
    id: 20,
    fullName: "Charlotte Hope",
    lastMessageSent: "See you in 10!",
    unreadCount: 6,
  },
  {
    id: 21,
    fullName: "Logan Paul",
    lastMessageSent: "Video was awesome!",
    unreadCount: 27,
  },
  {
    id: 22,
    fullName: "Avery Thorne",
    lastMessageSent: "I didn't get your last email.",
    unreadCount: 11,
  },
  {
    id: 23,
    fullName: "James Potter",
    lastMessageSent: "Reminder: Appointment at 5 pm today.",
    unreadCount: 4,
  },
  {
    id: 24,
    fullName: "Grace Lee",
    lastMessageSent: "Let's finalize the project details.",
    unreadCount: 15,
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
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
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
        text: `Hello, you're now chatting with ${user.fullName}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: user.fullName,
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  };

  if (selectedUser) {
    return (
      <ScreenLayout>
        <View className="flex-1">
          <View className="p-4 bg-primary">
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
