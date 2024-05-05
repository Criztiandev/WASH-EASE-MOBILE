import { View } from "react-native";
import React from "react";
import ReviewCard from "../../atoms/ReviewCard";
import { FlashList } from "@shopify/flash-list";

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
    <View style={{ flex: 1 }}>
      <FlashList
        data={MockDate}
        renderItem={({ item }) => <ReviewCard {...item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ReviewTab;
