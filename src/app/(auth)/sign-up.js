import React from "react";
import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Input from "../../components/atoms/Input";
import { Link } from "expo-router";
import Button from "../../components/atoms/Button";
import Checkbox from "../../components/atoms/Checkbox";

const SignUpScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden />

      <ScrollView>
        <View className="justify-center px-[32px] mt-[64px] mb-[32px]">
          <View className="w-[160px] h-[160px] justify-center items-center mx-auto rounded-full border"></View>

          <View className="space-y-2">
            <Input label={"Upload"} />
            <Input label={"First name"} />
            <Input label={"Last name"} />
            <Input label={"Address"} />
            <Input label={"Phone number"} />
            <Input label={"Email"} />
            <Input label={"Password"} />
          </View>

          <View className="flex-row space-x-3 mt-4">
            <Checkbox />
            <Text>
              I've read and accept the{" "}
              <Link
                href={""}
                className="font-semibold underline underline-offset-4">
                terms and conditions
              </Link>
            </Text>
          </View>

          <Button>Login</Button>

          <View className="justify-center items-center flex-row">
            <Text>Dont have an Account ?</Text>
            <Link
              href={"/sign-up"}
              className="font-semibold underline underline-offset-4">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
