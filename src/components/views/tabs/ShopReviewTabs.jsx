import { Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import CustomerReviewCard from "../../molecule/cards/CustomerReviewCard";

const ShopReviewTabs = ({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      {data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <CustomerReviewCard
              name={`Customer ${item?.customer_id}`}
              rating={item?.rating_count}
              comment={item?.rating_comment}
            />
          )}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-center text-[24px] opacity-50 font-bold">
            No reviews
          </Text>
        </View>
      )}
    </View>
  );
};

export default ShopReviewTabs;
