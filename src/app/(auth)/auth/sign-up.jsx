import { View, Text } from "react-native";
import React from "react";
import ScreenLayout from "../../../layout/ScreenLayout";
import { Avatar } from "react-native-paper";
import { useForm } from "react-hook-form";
import InputField from "../../../components/atoms/InputField";
import Button from "../../../components/atoms/Button";
import { Link, router } from "expo-router";
import useMultiform from "../../../hooks/useMultiform";
import Toast from "react-native-toast-message";

const SignUpScreen = () => {
  const form = useForm({
    defaultValues: {
      profile: "",
      firstName: "",
      lastName: "",
      address: "",
      password: "",
      email: "",
      password: "",
    },
  });

  const { step, isLastStep, nextStep, prevStep, isFirstStep } = useMultiform([
    <PersonalInfo control={form.control} />,
    <OtherInfo control={form.control} />,
    <AccountInfo control={form.control} />,
  ]);

  const onSubmit = (value) => {
    if (isLastStep) {
      Toast.show({
        type: "success",
        text1: "Registered Successfully",
      });
      console.log(value);
      router.navigate("/auth/sign-in");
      return;
    }

    nextStep();
  };
  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <Avatar.Icon size={200} />
        <View className=" w-full px-8 space-y-4">
          {step}

          <View>
            <Button onPress={form.handleSubmit(onSubmit)}>
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
                onPress={() => prevStep()}
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

const PersonalInfo = ({ control }) => {
  return (
    <View>
      <InputField
        controller={control}
        name="firstName"
        label={"First name"}
        placeholder="Enter your first name"
      />

      <InputField
        controller={control}
        name="lastName"
        label={"Last name"}
        placeholder="Enter your last name"
      />
    </View>
  );
};

const OtherInfo = ({ control }) => {
  return (
    <View>
      <InputField
        controller={control}
        name="address"
        label={"Address"}
        placeholder="Enter your address"
      />

      <InputField
        controller={control}
        name="password"
        label={"Phone number"}
        placeholder="Enter your phone number"
      />
    </View>
  );
};

const AccountInfo = ({ control }) => {
  return (
    <View>
      <InputField
        controller={control}
        name="profileImage"
        label={"Profile"}
        placeholder="Enter your Profile"
      />

      <InputField
        controller={control}
        name="email"
        label={"Email"}
        placeholder="Enter your email"
      />

      <InputField
        isPassword
        controller={control}
        name="password"
        label={"Password"}
        placeholder="Password"
      />
    </View>
  );
};
