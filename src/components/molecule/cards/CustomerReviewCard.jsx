import { View, Text } from "react-native";
import React from "react";
import StarRating from "../../../assets/icons/start_fill_icon.svg";
import { cn } from "../../../utils/dev.utils";
import { Avatar, IconButton } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useAuthContext } from "../../../context/AuthContext";
cn;

const CustomerReviewCard = ({ id, name, rating, date, comment, className }) => {
  const defaultyStyle = cn("p-4 border-b border-gray-300", className);
  const { authState } = useAuthContext();

  console.log(id);

  const query = useQuery({
    queryKey: [`shop-reviews-${id}`],
    queryFn: async () => {
      const { data: result } = await axios.get(
        `https://washease.online/api/laundry-shop/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      return result.data;
    },
  });

  if (query.isLoading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );

  if (query.isError) {
    console.log(query.error);
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View className={defaultyStyle}>
      <View className=" flex-row items-center space-x-4 mb-2">
        <IconButton
          icon="account"
          iconColor="#1e1e1e"
          size={48}
          className=" bg-primary/60 rounded-full "
        />
        <View className="flex-row justify-between flex-1">
          <View>
            <Text className="text-[18px] font-bold">{query.data?.name}</Text>
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

export default CustomerReviewCard;
