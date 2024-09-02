import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Icon, Searchbar } from "react-native-paper";
import CustomerReviewCard from "../../../../components/molecule/cards/CustomerReviewCard";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../../context/AuthContext";
import LoadingScreen from "../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../components/atoms/ErrorScreen";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

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
      item.title.toLowerCase().includes(query)
    );
    setSearchedItems(filteredData);
  };

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryFn: async () => {
      try {
        const result = await axios.get(
          `https://washeaselaundry.online/api/get-customer-transactions/${authState["user_id"]}/`
        );
        return result?.data || [];
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(`Server error: ${error.response.status}`);
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Error: ${error.message}`);
        }
      }
    },
    queryKey: [`choosen-shop-${authState["user_id"]}`],
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    Alert.alert(
      "Error",
      `An error occurred while fetching data: ${error.message}. Do you want to try again?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Retry",
          onPress: () => refetch(),
        },
      ]
    );
    return <ErrorScreen message={error.message} onRetry={refetch} />;
  }

  console.log(JSON.stringify(data, null, 2));

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
              {...item}
            />
          )}
          estimatedItemSize={1000}
        />
      </View>
    </View>
  );
};

export default RootScreen;

const TransactionCard = ({
  id,
  title,
  body,
  status,
  bill = 0,
  method,
  ...props
}) => {
  const transformedTitle = title?.split("_")?.join(" ");
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
          <Text className="px-4 py-1 bg-gray-300 rounded-full max-w-[200px] text-center ml-auto font-semibold mb-2">
            {status}
          </Text>
        </View>

        <Text
          className="text-lg font-semibold capitalize"
          style={{ flexShrink: 1 }}
        >
          {transformedTitle}
        </Text>

        <View className=" py-2 px-1 h-[200px]">
          {props?.service_avail?.map((item, index) => (
            <View
              key={`shop-avail-${item?.id}-${index}`}
              className="flex-row space-x-2"
            >
              <Text className="text-base">{item?.service_name}</Text>
              <Text className="text-base">-</Text>
              <Text className="text-base">
                {item?.service_price === "PN/A"
                  ? "Reserved"
                  : item?.service_price === "N/A"
                  ? "Reserved"
                  : item?.service_price}
              </Text>
            </View>
          ))}
        </View>

        <View className="border-b border-gray-400 my-2"></View>

        <View className="flex flex-row items-center space-x-2">
          <Text className="text-base">Kilo:</Text>
          <Text className="text-base">
            {props?.kilo === null
              ? "7 kilo"
              : props?.kilo === "N/A"
              ? "7 kilo"
              : `${props?.kilo} kilo`}
          </Text>
        </View>

        <View className="w-full justify-between flex-row items-center">
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
        </View>

        <Text style={{ flexShrink: 1 }}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
};
