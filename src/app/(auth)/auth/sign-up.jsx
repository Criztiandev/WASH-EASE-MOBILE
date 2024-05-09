import { View, Text } from "react-native";
import React, { lazy, useState } from "react";
import ScreenLayout from "../../../layout/ScreenLayout";
import { Avatar } from "react-native-paper";
import { useForm } from "react-hook-form";
import Button from "../../../components/atoms/Button";
import { Link, router } from "expo-router";
import useMultiform from "../../../hooks/useMultiform";
import Toast from "react-native-toast-message";
import {
  AccountInfoValidation,
  OtherInfoValidation,
  PersonalInfoValidation,
  registrationDefault,
} from "../../../service/validation/registration.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtomValue } from "jotai";

import PersonalInfoStep from "./partials/PersonalInfoStep";
import OtherInfoStep from "./partials/OtherInfoStep";
import AccountInfoStep from "./partials/AccountInfoStep";

const SignUpScreen = () => {
  const [payload, setPayload] = useState([]);
  const [index, setIndex] = useState(0);

  const validationMap = [
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
    resolver: zodResolver(validationMap[index]),
  });

  const { step, isLastStep, nextStep, prevStep, isFirstStep } = useMultiform([
    <PersonalInfoStep control={control} error={errors} />,
    <OtherInfoStep control={control} error={errors} />,
    <AccountInfoStep form={form} control={control} error={errors} />,
  ]);

  const onSubmit = (value) => {
    if (isLastStep) {
      Toast.show({
        type: "success",
        text1: "Registered Successfully",
      });

      const finalPayload = [...payload, value];
      const result = Object.assign({}, ...finalPayload);

      router.push("/auth/sign-in");
      return;
    }

    setPayload((prev) => [...prev, ...value]);

    setIndex((prev) => (prev >= validationMap.length ? prev : (prev += 1)));
    nextStep();
  };

  const handleBack = () => {
    setIndex((prev) => (prev <= 0 ? prev : (prev -= 1)));
    prevStep();
  };

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <Avatar.Icon size={200} />
        <View className=" w-full px-8 space-y-4">
          <View>{step}</View>

          <View>
            <Button onPress={handleSubmit(onSubmit)}>
              {isLastStep ? "Register" : "Next"}
            </Button>

            {isFirstStep ? (
              <View className="mt-4">
                <Text className="text-center text-primary">
                  Already have an account ?
                </Text>
                <Link
                  href={"/auth/sign-in"}
                  className="text-center underline text-primary font-bold text-lg">
                  Login
                </Link>
              </View>
            ) : (
              <Button
                variant={"outline"}
                onPress={handleBack}
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
