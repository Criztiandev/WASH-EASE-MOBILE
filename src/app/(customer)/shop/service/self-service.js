import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import ScreenLayout from "../../../../layout/ScreenLayout";
import WashingMachine from "../../../../assets/icons/washing_machine.svg";
import { cn } from "../../../../utils/dev.utils";
import { cva } from "class-variance-authority";
import Button from "../../../../components/atoms/Button";
import { Link } from "expo-router";
import useMultiform from "../../../../hooks/useMultiform";
import LaundryShopCardVertical from "../../../../components/organism/LaundryShopCardVertical";
import Card from "../../../../components/atoms/Card";

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

const MOCKDATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image:
      "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    details: {
      location: "Kahit saan",
      schedule: "3:00 - 4:00 PM",
    },
    status: "open",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "Kahit Dito",
      schedule: "4:00 - 4:00 PM",
    },
    status: "open",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image:
      "https://images.pexels.com/photos/13696491/pexels-photo-13696491.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    details: {
      location: "Kahit Paraan",
      schedule: "3:00 - 4:00 PM",
    },
    status: "close",
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
  const form = useMultiform([
    <SelectWashMachine />,
    <SelectDryMachine />,
    <ServiceCategories />,
  ]);

  return (
    <ScreenLayout className="justify-center items-center space-y-4 relative">
      {form.step}

      <View className="w-full px-4 mt-4 absolute bottom-0 mb-4">
        <Button onPress={() => form.nextStep()}>
          <Text className="text-white font-semibold text-[18px] text-center">
            Next
          </Text>
        </Button>

        {form.currentStepIndex > 0 && (
          <Button variant={"outline"} onPress={() => form.prevStep()}>
            <Text className=" font-semibold text-[18px] text-center">Back</Text>
          </Button>
        )}
      </View>
    </ScreenLayout>
  );
};

export default SelectMachineScreen;

const SelectWashMachine = () => {
  return (
    <View>
      <View className="justify-center items-center mb-4">
        <Text className="text-[24px] font-semibold mb-2">
          Select Washing Machine
        </Text>
        <Text className="text-[24px] font-semibold  px-8 py-2 rounded-full bg-blue-200">
          Wash
        </Text>
      </View>
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
    </View>
  );
};

const SelectDryMachine = () => {
  return (
    <View>
      <View className="justify-center items-center mb-4">
        <Text className="text-[24px] font-semibold mb-2">
          Select Washing Machine
        </Text>
        <Text className="text-[24px] font-semibold  px-8 py-2 rounded-full bg-blue-200">
          Dry
        </Text>
      </View>
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
    </View>
  );
};

const ServiceCategories = () => {
  return (
    <Card>
      <Text>HI</Text>
    </Card>
  );
};
