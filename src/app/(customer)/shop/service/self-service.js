import { View, Text, TouchableOpacity, SectionList } from "react-native";
import React, { useState } from "react";
import { cn } from "../../../../utils/dev.utils";
import useMultiform from "../../../../hooks/useMultiform";
import InfoIcon from "../../../../assets/icons/info_icon.svg";
import { Picker } from "@react-native-picker/picker";
import MachineSelection from "../../../../components/molecule/MachineSelection";
import ServiceSelection from "../../../../components/molecule/ServiceSelection";
import MaterialSelection from "../../../../components/molecule/MaterialSelection";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import DryMachineSelection from "../../../../components/molecule/DryMachineSelection";
import WashMachineSelection from "../../../../components/molecule/WashMachineSelection";

const SelfServiceScreen = () => {
  const form = useForm({
    defaultValues: {
      dry: "",
      wash: "",
      "basic-service": [],
    },
  });

  const { step, nextStep, prevStep, isLastStep, currentStepIndex } =
    useMultiform([
      <WashMachineSelection controller={form.control} name={"wash"} />,
      <DryMachineSelection controller={form.control} name={"dry"} />,
      <ServiceSelection form={form} name={"basic-service"} />,
      <MaterialSelection />,
      <CheckOutPanel />,
    ]);

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <View className="flex-1">
      <Button onPress={form.handleSubmit(onSubmit)}>Test</Button>

      {step}

      {!isLastStep && (
        <View className={cn("w-full px-4 mt-4 absolute bottom-0  mb-4")}>
          <Button
            onPress={() => nextStep()}
            className="bg-blue-700 py-2 rounded-full">
            <Text className="text-white font-semibold text-[18px] text-center">
              {isLastStep ? `Procced (P${70000})` : "Next"}
            </Text>
          </Button>

          {currentStepIndex > 0 && (
            <Button
              variant={"outline"}
              onPress={() => prevStep()}
              className="bg-gray-300 py-2 rounded-full mt-2">
              <Text className="text-black font-semibold text-[18px] text-center">
                Back
              </Text>
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

export default SelfServiceScreen;

const sections = [
  {
    title: "Basic Service",
    data: [
      { id: 1, service: "Service 1" },
      { id: 2, service: "Service 2" },
      { id: 3, service: "Service 3" },
    ],
    renderItem: ({ item }) => <ServiceItem service={item.service} />,
  },
  {
    title: "Materials",
    data: [
      { id: 1, material: "Material 1" },
      { id: 2, material: "Material 2" },
      { id: 3, material: "Material 3" },
    ],
    renderItem: ({ item }) => <MaterialItems material={item.material} />,
  },
];

const CheckOutPanel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const renderItem = ({ item }) => <MaterialItems />;
  const renderSectionHeader = ({ section: { title } }) => (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 18,
        padding: 10,
        backgroundColor: "#f3f6fe",
      }}>
      {title}
    </Text>
  );
  return (
    <View className="flex-1">
      <View className="items-center justify-center my-4">
        <Text className="text-[24px] font-semibold">Check Out</Text>
      </View>

      <View className="mx-2 p-4 rounded-md mb-4  space-y-2 border border-gray-400 shadow-md bg-[#F3F6FE]">
        <Text className="text-[22px] font-bold mb-2">Personal Info</Text>

        <View className="flex-row space-x-2">
          <Text className="font-bold text-[18px]">Name:</Text>
          <Text className="text-[18px]">Taylor Swift</Text>
        </View>

        <View className="flex-row space-x-2">
          <Text className="font-bold text-[18px]">Address:</Text>
          <Text className="text-[18px]">Barangay Katuparan, Taguig City</Text>
        </View>

        <View className="flex-row space-x-2">
          <Text className="font-bold text-[18px]">Phone:</Text>
          <Text className="text-[18px]">09999999999</Text>
        </View>

        <View className="flex-row space-x-2">
          <Text className="font-bold text-[18px]">Total:</Text>
          <Text className="text-[18px]">09999999999</Text>
        </View>
      </View>

      <View className="px-2">
        <Text className="text-[18px] font-bold mb-2">Payment Option</Text>
        <View className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Cash on Deliver" value="COD" />
            <Picker.Item label="Gcash" value="gcash" />
          </Picker>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "#ccc" }} />
        )}
        ListFooterComponent={() => (
          <View className={cn("w-full px-4 mt-4 mb-4")}>
            <Button onPress={() => form.nextStep()}>
              <Text className="text-white font-semibold text-[18px] text-center">
                Procced (P${70000})
              </Text>
            </Button>

            <Button variant={"outline"} onPress={() => form.prevStep()}>
              <Text className=" font-semibold text-[18px] text-center">
                Back
              </Text>
            </Button>
          </View>
        )}
      />
    </View>
  );
};

const ServiceItem = () => {
  return (
    <TouchableOpacity className="p-4 bg-white m-2 rounded-md border border-gray-200">
      <View className="flex-row space-x-4 justify-between ">
        <View className="flex-row space-x-4">
          <View className="w-[64px] h-[64px] flex border rounded-md"></View>
          <View>
            <Text className="text-[18px] font-bold">Regular Wash</Text>
            <Text className="text-[24px] font-bold">P 670</Text>
          </View>
        </View>
        <View className="justify-center">
          <TouchableOpacity className="  rounded-full ">
            <InfoIcon width={36} height={36} className="" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MaterialItems = () => {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <TouchableOpacity className="p-4 bg-white m-2 rounded-md border border-gray-200">
      <View className="flex-row space-x-4 justify-between items-center ">
        <View className="flex-row space-x-4">
          <View className="w-[64px] h-[64px] flex border rounded-md"></View>
          <View>
            <Text className="text-[18px] font-bold">Surf</Text>
            <Text className="text-[24px] font-bold">P 670</Text>
          </View>
        </View>

        {isSelected && (
          <View className="justify-center flex-row items-center space-x-2  px-4 h-12 rounded-md bg-blue-800/30 ">
            <TouchableOpacity>
              <InfoIcon width={36} height={36} fill={"white"} />
            </TouchableOpacity>

            <Text className="text-[24px] font-semibold  w-[32px] text-center">
              1
            </Text>

            <TouchableOpacity className="">
              <InfoIcon width={36} height={36} className="" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
