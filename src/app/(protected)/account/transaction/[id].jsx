import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Icon, Searchbar } from "react-native-paper";
import CustomerReviewCard from "../../../../components/molecule/cards/CustomerReviewCard";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../../context/AuthContext";
import LoadingScreen from "../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../components/atoms/ErrorScreen";

const MOCKDATA = [
  {
    id: "12321123",
    name: "Shop ng Shabu",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "123212323",
    name: "I miss you",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "1232231223",
    name: "Balik kana",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },

  {
    id: "12322313123",
    name: "Miss na kita",
    rating: "3.2",
    date: "April 3, 2024",
    comment: "Fast service and clean clothes! Loved it!",
  },
];

const RootScreen = () => {
  const { authState } = useAuthContext();
  const [searchedItems, setSearchedItems] = useState(MOCKDATA);

  const handleSearch = (value) => {
    const query = value.toLowerCase();
    const filteredData = MOCKDATA.filter((item) =>
      item.title.toLocaleLowerCase().includes(query)
    );
    setSearchedItems(filteredData);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        `https://washease.online/api/get-customer-transactions/${authState["user_id"]}/`
      );
      return result?.data || [];
    },
    queryKey: [`choosen-shop-${authState["user_id"]}`],
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    refetch();
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 ">
      <View className="flex-1 py-4">
        <Searchbar
          onChangeText={handleSearch}
          className="mb-4 bg-white mx-4"
          placeholder="Search here"
        />
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <TransactionCard
              id={item.id}
              title={item.service_type}
              status={item.status}
              bill={item.total_bill}
              method={item.payment_method}
            />
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default RootScreen;

const TransactionCard = ({ id, title, body, status, bill = 0, method }) => {
  const transformedTitle = title.split("_").join(" ");
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/shop/choosen/review/${id}`);
      }}
    >
      <View
        className="p-4 border border-gray-300 bg-white space-y-1 rounded-[5px]"
        style={{ flexShrink: 1 }}
      >
        <View className="flex-row space-x-2 mb-2 items-center justify-between">
          <Icon source={"bell"} size={24} />
          <Text className="px-4 py-1 bg-gray-300 rounded-full max-w-[100px] text-center ml-auto font-semibold mb-2">
            {status}
          </Text>
        </View>

        <Text
          className="text-lg font-semibold capitalize"
          style={{ flexShrink: 1 }}
        >
          {transformedTitle}
        </Text>
        <Text
          className="text-md font-semibold capitalize"
          style={{ flexShrink: 1 }}
        >
          Payment Method: {method}
        </Text>

        <Text
          className="text-md font-semibold capitalize"
          style={{ flexShrink: 1 }}
        >
          Total: {bill}
        </Text>

        <Text style={{ flexShrink: 1 }}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
};
