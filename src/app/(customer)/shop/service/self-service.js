import { View, Text } from "react-native";
import useMultiform from "../../../../hooks/useMultiform";
import { useForm } from "react-hook-form";
import Button from "../../../../components/atoms/Button";
import SelectWashMachineStep from "../../../../components/molecule/service-steps/SelectWashMachineStep";
import SelectDryMachineStep from "../../../../components/molecule/service-steps/SelectDryMachineStep";
import SelectWashServiceStep from "../../../../components/molecule/service-steps/SelectWashServiceStep";
import SelectWashMaterialStep from "../../../../components/molecule/service-steps/SelectWashMaterialStep";
import PaymentStep from "../../../../components/molecule/service-steps/PaymentStep";
import { atom, useAtomValue } from "jotai";

import Toast from "react-native-toast-message";
import CheckoutStep from "../../../../components/molecule/service-steps/CheckoutStep";
import { router } from "expo-router";

export const stepAtom = atom("");
const SelfServiceScreen = () => {
  const currentStep = useAtomValue(stepAtom);
  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-material": [],
      dry: "",
      wash: "",
      method: "",
    },
  });

  const {
    step,
    nextStep,
    prevStep,
    isLastStep,
    isFirstStep,
    currentStepIndex,
  } = useMultiform([
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
    <PaymentStep form={form} name="method" />,
  ]);

  const onSubmit = (value) => {
    const isHasValue = form.getValues(currentStep);

    if (isHasValue === "" || isHasValue === null || isHasValue.length <= 0) {
      Toast.show({
        type: "error",
        text1: "Please Fill all the field to proceed",
      });
      return;
    }

    if (!isLastStep) {
      nextStep();
      return;
    }

    console.log(value);
    router.push("/shop/service/success");
  };

  return (
    <View className="flex-1 bg-[#FAF8FF]">
      <View className=" flex-1 justify-center items-center">{step}</View>

      <View className="px-4">
        <Button onPress={form.handleSubmit(onSubmit)}>
          <Text className="text-center font-semibold text-xl text-white">
            Next
          </Text>
        </Button>

        {!isFirstStep && (
          <Button variant={"outline"} onPress={() => prevStep()}>
            <Text className="text-center font-semibold text-xl text-black">
              Back
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default SelfServiceScreen;
