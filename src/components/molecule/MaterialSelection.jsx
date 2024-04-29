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

const MOCKDATA = [
  { id: 0, title: "Test" },
  { id: 1, title: "Test" },
  { id: 2, title: "Test" },
  { id: 3, title: "Test" },
  { id: 4, title: "Test" },
  { id: 5, title: "Test" },
  { id: 6, title: "Test" },
];

const MaterialSelectedItems = atom([]);
const MaterialSelection = ({ form, name }) => {
  const selectedItems = useAtomValue(MaterialSelectedItems);
  const { field } = useController({
    control: form.control,
    name,
  });

  useEffect(() => {
    if (selectedItems) {
      form.setValue("basic-material", selectedItems);
    }
  }, [selectedItems]);

  const renderItem = useCallback(
    ({ item }) => <ServiceItem field={field} key={item.id} value={item.id} />,
    []
  );
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <>
      <View>
        <View className="items-center justify-center my-4">
          <Text className="text-[24px] font-semibold">Select Material</Text>
        </View>

        <FlatList
          data={MOCKDATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          className="mb-[220px] px-2"
        />
      </View>
    </>
  );
};

const ServiceItem = memo(({ value }) => {
  const setSelectedItems = useSetAtom(MaterialSelectedItems);
  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 0));

  const handleSelect = useCallback(() => {
    setChecked((prevChecked) => !prevChecked);
  }, []);

  useEffect(() => {
    if (checked) {
      setSelectedItems((prev) => {
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
      setSelectedItems((prev) => prev.filter((item) => item.id !== value));
    }
  }, [checked, quantity]);

  return (
    <TouchableOpacity
      className={cn(
        `p-4 bg-white mb-2 rounded-md border border-gray-200 ${
          checked ? "border-2 border-blue-700" : "border-none"
        }`
      )}
      onPress={handleSelect}>
      <View className="flex-row space-x-4 justify-between items-center ">
        <View className="flex-row space-x-4">
          <View className="w-[64px] h-[64px] flex border rounded-md"></View>
          <View>
            <Text className="text-[18px] font-bold">Regular Wash</Text>
            <View className="flex-row space-x-2 items-center">
              <Text className="text-[24px] font-bold">P 670</Text>
              {checked && (
                <Text className="text-[18px] font-bold text-gray-400">
                  X {quantity}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View className="justify-center">
          {checked && (
            <>
              <IconButton
                icon={"plus"}
                size={24}
                onPress={handleIncrement}
                className="bg-gray-300"
              />
              <IconButton
                icon={"minus"}
                size={24}
                onPress={handleDecrement}
                className="bg-gray-300"
              />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default MaterialSelection;
