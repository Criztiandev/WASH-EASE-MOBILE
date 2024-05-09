import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useForm } from "react-hook-form";
import InputField from "../components/atoms/InputField";
import Button from "../components/atoms/Button";
import { router } from "expo-router";
import {
  SignInValidationSchema,
  signInDefaulValue,
} from "../service/validation/auth/signIn.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import ScreenLayout from "../layout/ScreenLayout";
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import Toast from "react-native-toast-message";
import { useSetAtom } from "jotai";
import { AuthAtom } from "../service/states/auth.atoms";

const RootScreen = () => {
  const setAuth = useSetAtom(AuthAtom);
  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signInDefaulValue,
    resolver: zodResolver(SignInValidationSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (value) => await authApi.login(value),
    onSuccess: ({ data }) => {
      const { message, token, role, isAuthenticated } = data;

      Toast.show({
        type: "success",
        text1: message,
      });

      setAuth({
        token: token,
        isAuthenticated,
        role,
      });
    },
    onError: (error) => {
      console.log(error.message);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });

  const handleSubmit = (value) => {
    loginMutation.mutate(value);
  };
  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <Avatar.Icon size={200} />
        <View className=" w-full px-8 space-y-4">
          <InputField
            label={"Email"}
            controller={control}
            name="email"
            placeholder="Enter your email"
            errorMsg={errors?.email?.message}
          />

          <InputField
            secureTextEntry={true}
            controller={control}
            name="password"
            label={"Password"}
            placeholder="Enter your password"
            errorMsg={errors?.password?.message}
          />

          <Button onPress={onSubmit(handleSubmit)}>Login</Button>

          <View>
            <Text className="text-center text-primary">
              Dont have an Account ?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("./(public)/sign-up")}>
              <Text className="text-center underline text-primary font-bold text-lg">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default RootScreen;
