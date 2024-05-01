import { View, Text } from "react-native";
import React from "react";
import StarRating from "../../assets/icons/start_fill_icon.svg";
import { cn } from "../../utils/dev.utils";

const ReviewCard = ({ name, rating, date, comment, className }) => {
  const defaultyStyle = cn("p-4 border-b border-gray-300", className);

  return (
    <View className={defaultyStyle}>
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

      <Text>{comment}</Text>
    </View>
  );
};

export default ReviewCard;
