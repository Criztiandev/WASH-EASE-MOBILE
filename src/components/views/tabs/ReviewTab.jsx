import { View, Text, FlatList } from "react-native";
import React from "react";
import StarRating from "../../../assets/icons/start_fill_icon.svg";
import ReviewCard from "../../atoms/ReviewCard";

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
        renderItem={({ item }) => <ReviewCard {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ReviewTab;
