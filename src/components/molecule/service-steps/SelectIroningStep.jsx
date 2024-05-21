import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useController } from "react-hook-form";
import { FlashList } from "@shopify/flash-list";
import MaterialItem from "../items/MaterialItem";
import useStepManagement from "../../../hooks/useStepManagement";

const SelectIroningStep = ({ form, name, initialData = [], renderItems }) => {
  const [selected, setSelected] = useState(initialData || []);
  const { field } = useController({ control: form.control, name });
  useStepManagement({ name });

  useEffect(() => {
    form.setValue("basic-ironing", selected);
  }, [selected, form, name]);

  return (
    <View className="flex-1 w-full mb-4">
      <Text className="text-[24px] font-semibold text-center my-4">
        Select Ironing
      </Text>
      <FlashList
        data={renderItems}
        renderItem={({ item }) => (
          <MaterialItem
            field={field}
            id={item.id}
            payload={item}
            isActive={selected.some((current) => current?.id === item?.id)}
            selected={selected}
            onSelect={setSelected}
            initialQuantity={
              selected.find((current) => current?.id === item?.id)?.quantity
            }
          />
        )}
        keyExtractor={(item) => item?.id.toString()}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default SelectIroningStep;
