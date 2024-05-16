import { View, Text, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useSetAtom } from "jotai";
import ServiceItem from "../items/ServiceItem";
import { stepAtom } from "../../../service/states/service.atoms";
import ScreenLayout from "../../../layout/ScreenLayout";

const MOCKDATA = [
  {
    id: 0,
    title: "Regular Wash",
    price: 70,
    description: `Description: 38 mins
    Regular Clothes (Max of 7kgs)
    Maong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 1,
    title: "Premium Wash",
    price: 75,
    description: `Description: 48 mins
      Regular Clothes (Max of 7kgs)
      Maong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 2,
    title: "Regular Dry",
    price: 70,
    description: `Description: 38 mins
     Regular Clothes (Max of 7kgs)
     Maong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 3,
    title: "Premium Dry",
    price: 75,
    description: `Description: 48 mins
    Regular Clothes (Max of 7kgs)
    Maong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 4,
    title: "Bedsheets/Curtains",
    price: 55.0,
    description: `Description: per kilo
      ₱55.00/kg`,
  },
  {
    id: 5,
    title: "Blanket/Towel",
    price: 55,
    description: `Description: per kilo
     ₱55.00/kg`,
  },
  {
    id: 6,
    title: "Comforter",
    price: 85,
    description: "Per kilo",
  },
];

const SelectServiceStep = ({ form, name, initialData = [] }) => {
  const [selected, setSelected] = useState(initialData || []);
  const setCurrentStep = useSetAtom(stepAtom);

  // Selection handling
  const handleSelect = useCallback((checked, value) => {
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  }, []);

  useEffect(() => {
    form.setValue(name, selected);
  }, [selected, form, name]);

  useEffect(() => {
    setCurrentStep(name);
    return () => setCurrentStep("");
  }, [setCurrentStep, name]);

  // Render service item
  const renderItem = useCallback(
    ({ item }) => (
      <ServiceItem
        id={item.id}
        payload={item}
        isActive={selected.some((current) => current.id === item.id)}
        onSelect={handleSelect}
      />
    ),
    [handleSelect, selected]
  );
  return (
    <View className="flex-1  w-full mb-4">
      <Text className="text-[24px] font-semibold text-center my-4">
        Select Service
      </Text>

      <FlashList
        data={MOCKDATA}
        renderItem={renderItem}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default SelectServiceStep;
