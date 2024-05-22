import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import InputField from "../components/atoms/InputField";
import Button from "../components/atoms/Button";
import { router } from "expo-router";
import ScreenLayout from "../layout/ScreenLayout";

import useLoginForm from "../hooks/useLogin";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuthContext } from "../context/AuthContext";

const RootScreen = () => {
  const { setAuthState } = useAuthContext();
  const { getData, storeData } = useLocalStorage("auth");
  const {
    isPending,
    data: payload,
    control,
    onSubmitForm,
    errors,
  } = useLoginForm();

  useEffect(() => {
    if (payload && payload?.data) {
      const { data } = payload;

      if (data && data.isAuthenticated) {
        const currentRole = data?.role.toLowerCase();

        storeData(data);
        setAuthState(data);

        router.replace(`${currentRole}/home`);
      }
    }
  }, [payload]);

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../assets/images/logo.png")}
          contentFit="cover"
          transition={1000}
          style={{ width: 200, height: 200 }}
        />

        <View className=" w-full px-8 space-y-4">
          <InputField
            label={"Email"}
            controller={control}
            name="email"
            placeholder="Enter your email"
            errorMsg={errors?.email?.message}
          />

          <InputField
            isPassword
            controller={control}
            name="password"
            label={"Password"}
            placeholder="Enter your password"
            errorMsg={errors?.password?.message}
          />

          <Button onPress={onSubmitForm} disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </Button>

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
