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
    price: "840",
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 1,
    title: "Wash Dis",
    price: 400,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 2,
    title: "I Miss you",
    price: 203,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 3,
    title: "Balik kana",
    price: 300,
    description: "Di mapigilang magising",
  },
  {
    id: 4,
    title: "Sorry",
    price: 500,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 5,
    title: "Mahal",
    price: 400,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 6,
    title: "Ikay Nasaktan bumalik kana sakin",
    price: 402,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
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
    <View className="flex-1 w-full mt-4">
      <View className="px-4">
        <Text className="text-[24px] font-semibold text-center my-4 py-2 rounded-full">
          Select Basic Service
        </Text>
      </View>

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
