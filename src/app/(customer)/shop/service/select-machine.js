import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import ScreenLayout from "../../../../layout/ScreenLayout";
import WashingMachine from "../../../../assets/icons/washing_machine.svg";
import { cn } from "../../../../utils/dev.utils";
import { cva } from "class-variance-authority";
import Button from "../../../../components/atoms/Button";
import { Link } from "expo-router";

const WASHMOCKDATA = [
  {
    id: 0,
    title: "Washing",
    status: "active",
  },
  {
    id: 1,
    title: "Washing",
    status: "inactive",
  },
  {
    id: 2,
    title: "Washing",
    status: "active",
  },
  {
    id: 3,
    title: "Washing",
    status: "active",
  },
  {
    id: 4,
    title: "Washing",
    status: "active",
  },
];

const WashingStyle = cva("w-[100px] h-[100px] ", {
  variants: {
    status: {
      active: "opacity-100",
      inactive: "opacity-40",
    },
  },
});

const SelectMachineScreen = () => {
  return (
    <ScreenLayout className="justify-center items-center space-y-4">
      <View>
        <Link href={"/shop/123123123"}>T</Link>
      </View>
      <Text className="text-[24px]">Select Washing Machine</Text>

      <View className="flex-row space-x-4 flex-wrap justify-center items-center space-y-8">
        {WASHMOCKDATA.map((items, index) => (
          <TouchableOpacity onPress={() => {}} key={items.id}>
            <View className="justify-center items-center">
              <View className={cn(WashingStyle({ status: items.status }))}>
                <WashingMachine />
              </View>
              <Text
                className={cn(
                  `text-[18px] font-bold mt-2 ${
                    items.status === "inactive" ? "text-gray-400" : "text-black"
                  }`
                )}>
                {items.status === "inactive"
                  ? "Inactive"
                  : `Washing ${index + 1}`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View className="w-full px-4 mt-4">
        <Button>
          <Text className="text-white font-semibold text-[18px] text-center">
            Next
          </Text>
        </Button>
      </View>
    </ScreenLayout>
  );
};

export default SelectMachineScreen;
