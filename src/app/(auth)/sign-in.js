import React from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import Input from "../../components/atoms/Input";
import { Link } from "expo-router";
import Button from "../../components/atoms/Button";

const SignInScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden />

      <View className="h-screen justify-center px-[32px]">
        <View className="w-[160px] h-[160px] justify-center items-center mx-auto rounded-full border"></View>

        <View className="space-y-4">
          <Input label={"Email"} />
          <Input label={"Password"} />
        </View>

        <Button className={"my-4"}>
          <Link href={"/home"}>User</Link>
        </Button>

        <View className="justify-center items-center">
          <Text>Dont have an Account ?</Text>
          <Link
            href={"/sign-up"}
            className="font-semibold underline underline-offset-4">
            Register
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
