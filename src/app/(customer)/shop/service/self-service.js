import { View, Text } from "react-native";
import useMultiform from "../../../../hooks/useMultiform";
import { useForm } from "react-hook-form";
import Button from "../../../../components/atoms/Button";
import SelectWashMachineStep from "../../../../components/molecule/service-steps/SelectWashMachineStep";
import SelectDryMachineStep from "../../../../components/molecule/service-steps/SelectDryMachineStep";
import SelectServiceStep from "../../../../components/molecule/service-steps/SelectServiceStep";
import SelectMaterialStep from "../../../../components/molecule/service-steps/SelectMaterialStep";
import PaymentStep from "../../../../components/molecule/service-steps/PaymentStep";
import { useAtomValue } from "jotai";

import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { stepAtom } from "../../../../service/states/service.atoms";

const SelfServiceScreen = () => {
  const currentStep = useAtomValue(stepAtom);
  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-material": [],
      dry: "",
      wash: "",
      "payment-method": "",
      "delivery-method": "self-service",
    },
  });

  const { step, nextStep, prevStep, isLastStep, isFirstStep } = useMultiform([
    <SelectWashMachineStep controller={form.control} name={"wash"} />,
    <SelectDryMachineStep controller={form.control} name={"dry"} />,
    <SelectServiceStep
      form={form}
      name={"basic-service"}
      initialData={form.getValues("basic-service")}
    />,

    <SelectMaterialStep
      form={form}
      name="basic-material"
      initialData={form.getValues("basic-material")}
    />,
    <PaymentStep form={form} name="method" />,
  ]);

  const onSubmit = (value) => {
    const isHasValue = form.getValues(currentStep);

    if (isHasValue === "" || isHasValue === null || isHasValue?.length <= 0) {
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
    <View className="flex-1 bg-[#FAF8FF] mb-2">
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
