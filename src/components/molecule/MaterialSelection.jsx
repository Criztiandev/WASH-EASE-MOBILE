import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AddIcon from "../../assets/icons/info_icon.svg";

const MOCKDATA = [
  { id: 0, title: "Test" },
  { id: 1, title: "Test" },
  { id: 2, title: "Test" },
  { id: 3, title: "Test" },
  { id: 4, title: "Test" },
  { id: 5, title: "Test" },
  { id: 6, title: "Test" },
];

const MaterialSelection = () => {
  return (
    <View>
      <View className="items-center justify-center my-4">
        <Text className="text-[24px] font-semibold">Select Material</Text>
      </View>

      <FlatList
        data={MOCKDATA}
        renderItem={(items) => <MaterialItem />}
        keyExtractor={(item) => item.id}
        className="mb-[220px]"
      />
    </View>
  );
};

const MaterialItem = () => {
  const [count, setCount] = useState(0);

  return (
    <TouchableOpacity className=" p-4 bg-white m-2 rounded-md border border-gray-200">
      <View className="flex-row space-x-4 justify-between ">
        <View className="flex-row space-x-4">
          <View className="w-[64px] h-[64px] flex border rounded-md"></View>
          <View>
            <Text className="text-[18px] font-bold">Regular Wash</Text>
            <Text className="text-[24px] font-bold">P 670</Text>
          </View>
        </View>
        <View className="justify-center flex-row  space-x-2 items-center">
          <TouchableOpacity
            onPress={() => setCount((prev) => (prev += 1))}
            className=" w-[38px] h-[38px]  rounded-full ">
            <AddIcon />
          </TouchableOpacity>

          <Text className="text-[32px] text-center border border-gray-300 w-[48px] h-[48px] rounded-[5px] ">
            {count}
          </Text>

          <TouchableOpacity
            onPress={() => setCount((prev) => (prev -= 1))}
            className=" w-[38px] h-[38px]  rounded-full ">
            <AddIcon />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MaterialSelection;
