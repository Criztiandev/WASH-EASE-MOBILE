import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { useForm } from "react-hook-form";
import Button from "../../components/atoms/Button";
import { router } from "expo-router";
import useMultiform from "../../hooks/useMultiform";
import Toast from "react-native-toast-message";
import {
  AccountInfoValidation,
  OtherInfoValidation,
  PersonalInfoValidation,
  signUpDefaulValue,
} from "../../service/validation/auth/signUp.validation";
import { zodResolver } from "@hookform/resolvers/zod";

import PersonalInfoStep from "../../components/molecule/signInSteps/PersonalInfoStep";
import OtherInfoStep from "../../components/molecule/signInSteps/OtherInfoStep";
import AccountInfoStep from "../../components/molecule/signInSteps/AccountInfoStep";
import ScreenLayout from "../../layout/ScreenLayout";
import { useMutation } from "@tanstack/react-query";

import { Image } from "expo-image";
import authApi from "../../api/auth.api";

const RootScreen = () => {
  const [formData, setFormData] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const registrationMutation = useMutation({
    mutationFn: async (value) => {
      return await authApi.register(value);
    },

    onSuccess: (payload) => {
      Toast.show({
        type: "success",
        text1: "Registered Successfully",
        text2: payload.data?.message,
      });

      router.replace("/");
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: error.response?.data.message || "An unknown error occurred",
      });
    },
  });

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
    defaultValues: signUpDefaulValue,
    resolver: zodResolver(formValidationSchema[currentStepIndex]),
  });

  const { step, isFinalStep, isFirstStep, nextStep, prevStep } = useMultiform([
    <PersonalInfoStep control={control} error={errors} />,
    <OtherInfoStep form={form} control={control} error={errors} />,
    <AccountInfoStep form={form} control={control} error={errors} />,
  ]);

  const handleFormSubmit = (submittedFormData) => {
    const updatedFormData = [...formData, submittedFormData];
    setFormData(updatedFormData);

    if (isFinalStep) {
      const compiledFormData = Object.assign({}, ...updatedFormData);

      if (compiledFormData?.avatar) {
        const validFormat = [".jpeg", "png"];

        const { avatar } = compiledFormData;
        const fileName = avatar.split("/").pop().toLowerCase();
        const hasValidFormat = validFormat.some((format) =>
          fileName.toLowerCase().endsWith(format)
        );

        if (!hasValidFormat) {
          Toast.show({
            type: "error",
            text1: "Avatar is invalid format",
          });
          return;
        }
      }

      registrationMutation.mutate({ ...compiledFormData, role: "Customer" });
      return;
    }

    setCurrentStepIndex((prev) =>
      prev >= formValidationSchema.length ? prev : (prev += 1)
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
        <Image
          source={require("../../assets/images/logo.png")}
          contentFit="cover"
          transition={1000}
          style={{ width: 200, height: 200 }}
        />

        <View className=" w-full px-8 space-y-4">
          <View>{step}</View>

          <View className="space-y-4">
            <Button
              onPress={handleSubmit(handleFormSubmit)}
              disabled={registrationMutation.isPending}
            >
              {isFinalStep ? "Register" : "Next"}
            </Button>

            {isFirstStep ? (
              <View className="mt-4">
                <Text className="text-center text-primary">
                  Already have an account ?
                </Text>
                <TouchableOpacity onPress={() => router.push("/")}>
                  <Text className="text-center underline text-primary font-bold text-lg">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                variant={"outline"}
                onPress={handlePrevStep}
                textClassName={"text-black"}
              >
                Back
              </Button>
            )}
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;

// Helper
const isValidAvatarFormat = (avatar) => {
  const validFormats = [".jpeg", ".png"];
  return validFormats.some((format) => avatar.toLowerCase().endsWith(format));
};
