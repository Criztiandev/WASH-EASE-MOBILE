import { Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import ShopServiceDetailCard from "../../molecule/ShopServiceDetailCard";

const ShopServiceOfferTab = ({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      {data.lenth > 0 ? (
        <FlashList
          data={data}
          renderItem={({ item }) => <ShopServiceDetailCard {...item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-center text-[24px] opacity-50 font-bold">
            No Service
          </Text>
        </View>
      )}
    </View>
  );
};

export default ShopServiceOfferTab;
