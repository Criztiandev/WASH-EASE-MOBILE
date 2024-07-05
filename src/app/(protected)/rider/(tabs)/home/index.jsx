import React from "react";
import { Text, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { router } from "expo-router";

const RootScreen = () => {
  const data = [];
  return (
    <ScreenLayout>
      <Text className="text-2xl font-bold p-4">My Task</Text>
      <View className="flex-1 my-4">
        {data.length > 0 ? (
          <FlashList
            data={[]}
            renderItem={({ item }) => (
              <View className="">
                <HeroShopCard
                  {...item}
                  label={"View details"}
                  onNavigate={() =>
                    router.push(`/rider/task/details/${item.id}`)
                  }
                />
              </View>
            )}
            estimatedItemSize={200}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-3xl ">No available Task</Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
