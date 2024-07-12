import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import TaskDetailsCard from "../../../../../components/molecule/cards/TaskDetailsCard";
import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import { IconButton, Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Picker } from "@react-native-picker/picker";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { transactionAtoms } from "../../(tabs)/home";

const RootScreen = () => {
  const transactionAtom = useAtomValue(transactionAtoms);

  const transformedPayload = useMemo(() => {
    return transactionAtom.map((items) => ({
      id: items.id,
      fullName: items?.customer_name || "John Doe",
      address: items.customer_address || "Exceptur sed offici",
      phoneNumber: items.payment_method,
      status: items.status,
    }));
  }, [transactionAtom]);

  return (
    <View className=" flex-1 space-y-4">
      <View className="flex-1">
        <FlashList
          data={transformedPayload}
          renderItem={({ item }) => <TaskDetailsCard {...item} />}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default RootScreen;
