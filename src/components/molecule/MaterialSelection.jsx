import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import InfoIcon from "../../assets/icons/info_icon.svg";
import { Badge, IconButton, Modal, Portal } from "react-native-paper";
import { cn } from "../../utils/dev.utils";
import { ToggleButton } from "react-native-paper";
import { useController } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FlashList } from "@shopify/flash-list";
import Button from "../atoms/Button";

const MOCKDATA = [
  { id: 0, title: "Test" },
  { id: 1, title: "Test" },
  { id: 2, title: "Test" },
  { id: 3, title: "Test" },
  { id: 4, title: "Test" },
  { id: 5, title: "Test" },
  { id: 6, title: "Test" },
];

const MaterialSelection = ({ form, name }) => {
  const { field } = useController({ control: form.control, name });
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    form.setValue(name, selectedItems);
  }, [selectedItems, form, name]);

  const renderItem = useCallback(
    ({ item }) => (
      <MaterialItem
        field={field}
        key={item.id}
        value={item.id}
        onSelect={setSelectedItems}
        isActive={selectedItems.includes(item.id)}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <>
      <View className="flex-1 border w-full mb-4">
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

const MaterialItem = memo(({ value, onSelect, isActive = false }) => {
  const [checked, setChecked] = useState(isActive);
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 0));

  const handleSelect = useCallback(() => {
    setChecked((prevState) => {
      const newState = !prevState;

      if (newState) {
        handleIncrement();
      } else {
        handleDecrement();
      }

      return newState;
    });
  }, []);

  useEffect(() => {
    if (checked) {
      onSelect((prev) => {
        const index = prev.findIndex((item) => item.id === value);
        if (index > -1) {
          return prev.map((item) =>
            item.id === value ? { ...item, quantity } : item
          );
        } else {
          return [...prev, { id: value, quantity }];
        }
      });
    } else {
      onSelect((prev) => prev.filter((item) => item.id !== value));
    }
  }, [checked, quantity]);

  return (
    <TouchableOpacity
      className={cn(
        `${
          checked && "bg-blue-300/50 border-2 border-blue-400"
        } rounded-[5px] mb-2`
      )}
      onPress={handleSelect}>
      <View className=" max-h-[150px] py-4 px-2 flex-row ">
        <View className="justify-between flex-row  flex-1">
          {/* Details */}
          <View
            className="flex-row space-x-3 justify-between items-center"
            style={{ flexShrink: 1 }}>
            {quantity > 0 && (
              <Badge
                className={
                  "absolute -top-3 left-1 text-[14px] w-[24px] h-[24px] rounded-full"
                }>
                {quantity}
              </Badge>
            )}
            <View className="w-[64px] h-[64px] border rounded-[5px]"></View>
            <View>
              <Text className="text-[18px] font-bold">Regular Wash</Text>
              <Text className="text-[18px]">950</Text>
            </View>
          </View>

          {/* Actions */}
          {checked && (
            <View className="flex-row">
              <IconButton
                icon="plus"
                size={24}
                onPress={handleIncrement}
                className=" bg-gray-400/50"
              />

              <IconButton
                icon="minus"
                size={24}
                onPress={handleDecrement}
                className=" bg-gray-400/50"
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default MaterialSelection;
