import { View, Text, TouchableOpacity } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Badge, IconButton } from "react-native-paper";
import { useController } from "react-hook-form";

import { FlashList } from "@shopify/flash-list";
import { cn } from "../../../utils/dev.utils";
import { useSetAtom } from "jotai";
import { stepAtom } from "../../../app/(customer)/shop/service/self-service";
import MaterialItem from "./partials/MaterialItem";

const MOCKDATA = [{ id: 0, title: "Regular Wash", price: 300 }];

const SelectWashMaterialStep = ({ form, name, initialData = [] }) => {
  const { field } = useController({ control: form.control, name });
  const [selectedItems, setSelectedItems] = useState(initialData);
  const setCurrentStep = useSetAtom(stepAtom);

  useEffect(() => {
    form.setValue(name, selectedItems);
  }, [selectedItems, form, name]);

  const renderItem = useCallback(
    ({ item }) => (
      <MaterialItem
        field={field}
        id={item.id}
        payload={item}
        onSelect={setSelectedItems}
        isActive={selectedItems.some((current) => current.id === item.id)}
        initialQuantity={
          selectedItems.find((current) => current.id === item.id)?.quantity
        }
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  // Check validation
  useEffect(() => {
    setCurrentStep(name);

    return () => {
      setCurrentStep("");
    };
  }, []);

  return (
    <>
      <View className="flex-1  w-full mb-4">
        <Text className="text-[24px] font-semibold text-center my-4">
          Select Material
        </Text>

        <FlashList
          data={MOCKDATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={200}
        />
      </View>
    </>
  );
};

export default SelectWashMaterialStep;
