import React from "react";
import { View, Text } from "react-native";
import { useController } from "react-hook-form";
import { FlashList } from "@shopify/flash-list";
import { useSetAtom } from "jotai";
import MaterialItem from "../items/MaterialItem";
import useStepManagement from "../../../hooks/useStepManagement";
import useMultiSelect from "../../../hooks/useSingleSelect";
import useFetchService from "../../../hooks/useFetchService";
import LoadingScreen from "../../atoms/LoadingScreen";
import ErrorScreen from "../../atoms/ErrorScreen";

const SelectMaterialStep = ({ form, name, initialData = [] }) => {
  const { field } = useController({ control: form.control, name });
  const { selected, handleSelect } = useMultiSelect(initialData, form, name);
  useStepManagement({ name });

  const { data, isLoading, isError } = useFetchService({
    filter: "Material",
    name: "basic-material",
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <View className="flex-1 w-full mb-4">
      <Text className="text-[24px] font-semibold text-center my-4">
        Select Material
      </Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <MaterialItem
            field={field}
            id={item.id}
            payload={item}
            isActive={selected.some((current) => current?.id === item?.id)}
            onSelect={handleSelect}
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

export default SelectMaterialStep;
