import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Button from "../../atoms/Button";
import CloseIcon from "../../../assets/icons/close_icon.svg";

const MOCKDATA = [
  {
    id: "123123213213333",
    cover: "",
    title: "Regular Washing",
    price: 300,
  },
  {
    id: "12312213213333",
    cover: "",
    title: "Premium Wash",
    price: 300,
  },
  {
    id: "1231232132s333",
    cover: "",
    title: "Regular Dry",
    price: 300,
  },
];

const ServiceTab = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [selected, setIsSelected] = useState("");

  const toggleModal = (id) => {
    setIsToggle((prev) => !prev);
    setIsSelected(id);
  };

  return (
    <>
      <View className="p-4">
        <FlatList
          data={MOCKDATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleModal(item?.id)}
              className="pb-4 border-b border-gray-300 mb-4">
              <View className="flex-row gap-2">
                <View className="w-[84px] h-[84px] border rounded-[5px] "></View>
                <View className="space-y-1">
                  <Text className="text-[18px] font-bold">{item?.title}</Text>
                  <Text className="text-[18px] font-bold">₱ {item?.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(items) => items.id}
        />
      </View>

      <Modal animationType="slide" visible={isToggle} className="">
        <ScrollView className="p-4">
          <View className="flex-row justify-between mb-4">
            <Text className="font-bold text-2xl">Description</Text>
            <Button
              onPress={() => setIsToggle(!isToggle)}
              variant={"outline"}
              size={"icon"}
              className={"rounded-full"}>
              <CloseIcon />
            </Button>
          </View>

          <View>
            <Text>{selected}</Text>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default ServiceTab;
