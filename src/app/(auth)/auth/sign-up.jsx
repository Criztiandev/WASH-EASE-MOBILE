import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenLayout from "../../../layout/ScreenLayout";
import { Avatar } from "react-native-paper";
import { useForm } from "react-hook-form";
import Button from "../../../components/atoms/Button";
import { router } from "expo-router";
import useMultiform from "../../../hooks/useMultiform";
import Toast from "react-native-toast-message";
import {
  AccountInfoValidation,
  OtherInfoValidation,
  PersonalInfoValidation,
  registrationDefault,
} from "../../../service/validation/registration.validation";
import { zodResolver } from "@hookform/resolvers/zod";

import PersonalInfoStep from "./partials/PersonalInfoStep";
import OtherInfoStep from "./partials/OtherInfoStep";
import AccountInfoStep from "./partials/AccountInfoStep";

const SignUpScreen = () => {
  const [formData, setFormData] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const formValidationSchema = [
    PersonalInfoValidation,
    OtherInfoValidation,
    AccountInfoValidation,
  ];

  const {
    formState: { errors },
    control,
    handleSubmit,
    ...form
  } = useForm({
    defaultValues: registrationDefault,
    resolver: zodResolver(formValidationSchema[currentStepIndex]),
  });

  const { step, isFinalStep, isFirstStep, nextStep, prevStep } = useMultiform([
    <PersonalInfoStep control={control} error={errors} />,
  ]);

  const handleFormSubmit = (submittedFormData) => {
    const updatedFormData = [...formData, submittedFormData];
    setFormData(updatedFormData);

    if (isFinalStep) {
      const compiledFormData = Object.assign({}, updatedFormData);

      Toast.show({
        type: "success",
        text1: "Registered Successfully",
      });

      console.log(compiledFormData);

      router.push("/auth/sign-in");
      return;
    }

    setPayload((prev) => [...prev, ...value]);
    setCurrentStepIndex((prev) =>
      prev >= validationMap.length ? prev : (prev += 1)
    );
    nextStep();
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev <= 0 ? prev : (prev -= 1)));
    prevStep();
  };

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <Avatar.Icon size={200} />
        <View className=" w-full px-8 space-y-4">
          <View>{step}</View>

          <View>
            <Button onPress={handleSubmit(handleFormSubmit)}>
              {isFinalStep ? "Register" : "Next"}
            </Button>

            {isFirstStep ? (
              <View className="mt-4">
                <Text className="text-center text-primary">
                  Already have an account ?
                </Text>
                <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
                  <Text className="text-center underline text-primary font-bold text-lg">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                variant={"outline"}
                onPress={handlePrevStep}
                textClassName={"text-black"}>
                Back
              </Button>
            )}
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SignUpScreen;
