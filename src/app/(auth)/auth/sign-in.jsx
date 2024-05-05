import { View, Text } from "react-native";
import React from "react";
import ScreenLayout from "../../../layout/ScreenLayout";
import { Avatar } from "react-native-paper";
import { useForm } from "react-hook-form";
import InputField from "../../../components/atoms/InputField";
import Button from "../../../components/atoms/Button";
import { Link } from "expo-router";

const SingInScreen = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <Avatar.Icon size={200} />
        <View className=" w-full px-8 space-y-4">
          <InputField
            label={"Email"}
            controller={form.control}
            name="email"
            placeholder="Enter your email"
          />

          <InputField
            secureTextEntry={true}
            controller={form.control}
            name="password"
            label={"Password"}
            placeholder="Enter your password"
          />

          <Button onPress={form.handleSubmit(onSubmit)}>Login</Button>

          <View>
            <Text className="text-center text-primary">
              Dont have an Account ?{" "}
            </Text>
            <Link
              href={"/auth/sign-up"}
              className="text-center underline text-primary font-bold text-lg">
              Register
            </Link>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SingInScreen;
