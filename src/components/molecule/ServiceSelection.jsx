import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfoIcon from "../../assets/icons/info_icon.svg";
import { Modal, Portal } from "react-native-paper";
import { cn } from "../../utils/dev.utils";
import { useController, useFieldArray } from "react-hook-form";
import Checkbox from "expo-checkbox";

const MOCKDATA = [
  { id: 0, title: "Test" },
  { id: 1, title: "Test" },
  { id: 2, title: "Test" },
  { id: 3, title: "Test" },
  { id: 4, title: "Test" },
  { id: 5, title: "Test" },
  { id: 6, title: "Test" },
];

const ServiceSelection = ({ form, name }) => {
  const [selected, setSelected] = useState([]);
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
        onSelect={handleSelect}
        onShowModal={showModal}
      />
    ),
    [handleSelect, showModal]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  useMemo(() => {
    form.setValue(name, selected);
  }, [selected, form, name]);

  return (
    <>
      <View>
        <View className="items-center justify-center my-4">
          <Text className="text-[24px] font-semibold">
            Select Basic Service
          </Text>
        </View>

        <FlatList
          data={MOCKDATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          className="mb-[220px] px-2"
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

const ServiceItem = ({ value, onSelect, onShowModal }) => {
  const [checked, setChecked] = useState(false);
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
        `p-4 bg-white mb-2 rounded-md border border-gray-200 ${
          checked ? "border-2 border-blue-700" : "border-none"
        }`
      )}
      onPress={handleChecked}>
      <View className="flex-row space-x-4 justify-between ">
        <View className="flex-row space-x-4">
          <View className="w-[64px] h-[64px] flex border rounded-md"></View>
          <View>
            <Text className="text-[18px] font-bold">Regular Wash</Text>
            <Text className="text-[24px] font-bold">P 670</Text>
          </View>
        </View>
        <View className="justify-center">
          <TouchableOpacity className="  rounded-full " onPress={onShowModal}>
            <InfoIcon width={36} height={36} className="" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceSelection;
