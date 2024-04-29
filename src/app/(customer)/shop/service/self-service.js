import { View, Text, TouchableOpacity, SectionList } from "react-native";
import React, { useState } from "react";
import useMultiform from "../../../../hooks/useMultiform";
import InfoIcon from "../../../../assets/icons/info_icon.svg";
import { useForm } from "react-hook-form";
import Button from "../../../../components/atoms/Button";
import SelectWashMachineStep from "../../../../components/molecule/service-steps/SelectWashMachineStep";
import SelectDryMachineStep from "../../../../components/molecule/service-steps/SelectDryMachineStep";
import SelectWashServiceStep from "../../../../components/molecule/service-steps/SelectWashServiceStep";
import SelectWashMaterialStep from "../../../../components/molecule/service-steps/SelectWashMaterialStep";
import PaymenStep from "../../../../components/molecule/service-steps/PaymenStep";

const SelfServiceScreen = () => {
  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-material": [],
      dry: "",
      wash: "",
    },
  });

  const { step, nextStep, prevStep, isLastStep, currentStepIndex } =
    useMultiform([
      <SelectWashMachineStep controller={form.control} name={"wash"} />,
      <SelectDryMachineStep controller={form.control} name={"dry"} />,
      <SelectWashServiceStep
        form={form}
        name={"basic-service"}
        initialData={form.getValues("basic-service")}
      />,

      <SelectWashMaterialStep
        form={form}
        name="basic-material"
        initialData={form.getValues("basic-material")}
      />,
      <PaymenStep />,
    ]);

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <View className="flex-1 bg-[#FAF8FF]">
      <Button onPress={form.handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button>

      <View className=" flex-1 justify-center items-center">{step}</View>

      <View className="px-4">
        <Button onPress={() => nextStep()}>
          <Text className="text-center font-semibold text-xl text-white">
            Next
          </Text>
        </Button>

        <Button variant={"outline"} onPress={() => prevStep()}>
          <Text className="text-center font-semibold text-xl text-black">
            Back
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default SelfServiceScreen;
