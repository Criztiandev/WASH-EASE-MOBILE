import { View, Text } from "react-native";
import { useForm } from "react-hook-form";

import { useAtomValue } from "jotai";

import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { stepAtom } from "../../../../../service/states/service.atoms";

// Components
import Button from "../../../../../components/atoms/Button";
import useMultiform from "../../../../../hooks/useMultiform";

// Steps
import SelectMaterialStep from "../../../../../components/molecule/service-steps/SelectMaterialStep";
import SelectDryCleaningStep from "../../../../../components/molecule/service-steps/SelectDryCleaningStep";
import SelectIroningStep from "../../../../../components/molecule/service-steps/SelectIroningStep";
import PaymentStep from "../../../../../components/molecule/service-steps/PaymentStep";
import CheckOutStep from "../../../../../components/molecule/service-steps/CheckOutStep";
import SelectServiceStep from "../../../../../components/molecule/service-steps/SelectServiceStep";

const RootScreen = () => {
  const currentStep = useAtomValue(stepAtom);
  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-cleaning": [],
      "basic-ironing": [],
      "basic-material": [],
      "payment-method": "",
      "delivery-method": "",
      total: 0,
    },
  });

  const { step, nextStep, prevStep, isFinalStep, isFirstStep } = useMultiform([
    <SelectServiceStep
      form={form}
      name={"basic-service"}
      initialData={form.getValues("basic-service")}
    />,

    <SelectDryCleaningStep
      form={form}
      name={"basic-cleaning"}
      initialData={form.getValues("basic-cleaning")}
    />,

    <SelectIroningStep
      form={form}
      name={"basic-ironing"}
      initialData={form.getValues("basic-ironing")}
    />,

    <SelectMaterialStep
      form={form}
      name="basic-material"
      initialData={form.getValues("basic-material")}
    />,
    <PaymentStep form={form} name="method" />,
    <CheckOutStep
      total={form.getValues("total")}
      method={form.getValues("payment-method")}
    />,
  ]);

  const onSubmit = (value) => {
    const isHasValue = form.getValues("basic-service");

    if (isHasValue === "" || isHasValue === null || isHasValue?.length <= 0) {
      Toast.show({
        type: "error",
        text1: "Please Fill all the field to proceed",
      });
      return;
    }

    if (!isFinalStep) {
      nextStep();
      return;
    }

    Toast.show({
      type: "success",
      text1: "Order Placed",
      text2: "Thank you for using wash ease",
    });
    router.replace("../../customer/(tabs)/home");
  };

  return (
    <View className="flex-1 bg-[#FAF8FF] mb-2">
      <View className=" flex-1 justify-center items-center">{step}</View>

      <View className="px-4  space-y-2">
        <Button onPress={form.handleSubmit(onSubmit)}>
          <Text className="text-center font-semibold text-xl text-white ">
            {isFinalStep ? "Proceed" : "Next"}
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

export default RootScreen;
