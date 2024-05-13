import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useController } from "react-hook-form";

import { FlashList } from "@shopify/flash-list";
import { useSetAtom } from "jotai";
import MaterialItem from "../items/MaterialItem";
import { stepAtom } from "../../../service/states/service.atoms";

const MOCKDATA = [{ id: 0, title: "Regular Wash", price: 300 }];

const SelectMaterialStep = ({ form, name, initialData = [] }) => {
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
  );
};

export default SelectMaterialStep;
