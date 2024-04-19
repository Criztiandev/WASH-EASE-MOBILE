import { View, Text, FlatList } from "react-native";
import React from "react";
import StarRating from "../../../assets/icons/start_fill_icon.svg";

const MockDate = [
  {
    id: "123213123",
    name: "John Die",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "1232123123",
    name: "Jane Doe",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "12322313123",
    name: "Doe Die",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "123223313123",
    name: "Doe Die",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },
];

const ReviewTab = () => {
  return (
    <View style={{ flex: 1, paddingBottom: 75 }}>
      <FlatList
        data={MockDate}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-[8px]">
            <DetailsHeader {...item} />
            <Text>{item.comment}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ReviewTab;

const DetailsHeader = ({ name, rating, date }) => {
  return (
    <View className=" flex-row items-center space-x-4 mb-2">
      <View className="w-[64px] h-[64px] rounded-full border"></View>
      <View className="flex-row justify-between flex-1">
        <View>
          <Text className="text-[18px] font-bold">{name}</Text>
          <View className="flex-row space-x-2 items-center">
            <StarRating />
            <Text className="font-bold opacity-60">{rating}</Text>
          </View>
        </View>

        <Text className="text-[16] opacity-50">{date}</Text>
      </View>
    </View>
  );
};
