import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import InfoIcon from "../../../assets/icons/info_icon.svg";
import { Modal, Portal } from "react-native-paper";
import { cn } from "../../../utils/dev.utils";
import { FlashList } from "@shopify/flash-list";

const MOCKDATA = [
  { id: 0, title: "Test" },
  { id: 1, title: "Test" },
  { id: 2, title: "Test" },
  { id: 3, title: "Test" },
  { id: 4, title: "Test" },
  { id: 5, title: "Test" },
  { id: 6, title: "Test" },
];

const SelectWashServiceStep = ({ form, name, initialData = [] }) => {
  const [selected, setSelected] = useState(initialData || []);
  const [visible, setVisible] = useState(false);

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);

  const handleSelect = useCallback((checked, value) => {
    setSelected((prevSelected) => {
      if (checked) {
        return prevSelected.includes(value)
          ? prevSelected
          : [...prevSelected, value];
      }
      return prevSelected.filter((item) => item !== value);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ServiceItem
        value={item.id}
        isActive={selected.includes(item.id)}
        onSelect={handleSelect}
        onShowModal={showModal}
      />
    ),
    [handleSelect, showModal, selected]
  );
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  useEffect(() => {
    form.setValue(name, selected); // Always set the selected value to the form
  }, [selected, form, name]); // Dependencies: selected, form, and name

  useEffect(() => {
    const value = form.getValues("basic-service");
    console.log(value);
  }, []);

  return (
    <>
      <View className="flex-1  w-full mb-4">
        <View className="px-4">
          <Text className="text-[24px] font-semibold text-center my-4 py-2 rounded-full">
            Select Basic Service
          </Text>
        </View>

        <FlashList
          data={MOCKDATA}
          renderItem={renderItem}
          estimatedItemSize={200}
          keyExtractor={keyExtractor}
        />
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </>
  );
};

const ServiceItem = ({ value, onSelect, onShowModal, isActive = false }) => {
  const [checked, setChecked] = useState(isActive);

  const handleChecked = useCallback(() => {
    setChecked((prev) => {
      const newValue = !prev;
      onSelect(newValue, value);
      return newValue;
    });
  }, [onSelect, value]);

  return (
    <TouchableOpacity
      className={cn(
        `${
          checked && "bg-blue-300/50 border-2 border-blue-400"
        } rounded-[5px] mb-2`
      )}
      onPress={handleChecked}>
      <View className=" max-h-[150px] py-4 px-2 flex-row justify-between ">
        <View className="flex-row space-x-3" style={{ flexShrink: 1 }}>
          <View className="w-[64px] h-[64px] border rounded-[5px]"></View>
          <View>
            <Text className="text-[18px] font-bold">Regular Wash</Text>
            <Text className="text-[18px]">950</Text>
          </View>
        </View>

        <TouchableOpacity className="  rounded-full " onPress={onShowModal}>
          <InfoIcon width={36} height={36} className="" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SelectWashServiceStep;
