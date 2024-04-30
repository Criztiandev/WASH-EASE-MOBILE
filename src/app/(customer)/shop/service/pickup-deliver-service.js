import { View, Text } from "react-native";
import useMultiform from "../../../../hooks/useMultiform";
import { useForm } from "react-hook-form";
import Button from "../../../../components/atoms/Button";
import SelectServiceStep from "../../../../components/molecule/service-steps/SelectServiceStep";
import SelectMaterialStep from "../../../../components/molecule/service-steps/SelectMaterialStep";
import PaymentStep from "../../../../components/molecule/service-steps/PaymentStep";
import { useAtomValue } from "jotai";

import { router } from "expo-router";
import { stepAtom } from "../../../../service/states/service.atoms";

const Basic1 = [
  {
    id: 0,
    title: "Regular Wash",
    price: "840",
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 1,
    title: "Wash Dis",
    price: 400,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 2,
    title: "I Miss you",
    price: 203,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 3,
    title: "Balik kana",
    price: 300,
    description: "Di mapigilang magising",
  },
  {
    id: 4,
    title: "Sorry",
    price: 500,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 5,
    title: "Mahal",
    price: 400,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 6,
    title: "Ikay Nasaktan bumalik kana sakin",
    price: 402,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
];
const Basic2 = [
  {
    id: 0,
    title: "Regular Wash",
    price: "840",
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 1,
    title: "Wash Dis",
    price: 400,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 2,
    title: "I Miss you",
    price: 203,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 3,
    title: "Balik kana",
    price: 300,
    description: "Di mapigilang magising",
  },
  {
    id: 4,
    title: "Sorry",
    price: 500,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 5,
    title: "Mahal",
    price: 400,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
  {
    id: 6,
    title: "Ikay Nasaktan bumalik kana sakin",
    price: 402,
    description:
      "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  },
];

import Toast from "react-native-toast-message";

const RootScreen = () => {
  const currentStep = useAtomValue(stepAtom);
  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-cleaning": [],
      "basic-ironing": [],
      "basic-material": [],
      method: "",
    },
  });

  const { step, nextStep, prevStep, isLastStep, isFirstStep } = useMultiform([
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

    if (!isLastStep) {
      console.log(value);
      nextStep();
      return;
    }

    console.log(value);
    // router.push("/shop/service/success");
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

export default RootScreen;
