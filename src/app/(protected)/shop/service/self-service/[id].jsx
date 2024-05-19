import { View, Text } from "react-native";
import Button from "../../../../../components/atoms/Button";
import useSelfServiceForm from "../../../../../hooks/useSelfServiceForm";
import { useQuery } from "@tanstack/react-query";

const SelfServiceScreen = () => {
  const { form, step, onSubmit, isFirstStep, isFinalStep, prevStep, data } =
    useSelfServiceForm({ id: 2 });

  return (
    <View className="flex-1 bg-[#FAF8FF] mb-2">
      <View className="flex-1 justify-center items-center">{step}</View>
      <View className="px-4 space-y-2">
        <Button onPress={form.handleSubmit(onSubmit)}>
          <Text className="text-center font-semibold text-xl text-white">
            {isFinalStep ? "Proceed" : "Next"}
          </Text>
        </Button>
        {!isFirstStep && (
          <Button variant="outline" onPress={prevStep}>
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
