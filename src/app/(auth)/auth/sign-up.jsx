import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenLayout from "../../../layout/ScreenLayout";
import { Avatar } from "react-native-paper";
import { useForm } from "react-hook-form";
import InputField from "../../../components/atoms/InputField";
import Button from "../../../components/atoms/Button";
import { Link, router } from "expo-router";
import useMultiform from "../../../hooks/useMultiform";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

const defaultValues = {
  profile: "",
  firstName: "",
  lastName: "",
  address: "",
  password: "",
  email: "",
  password: "",
};

const SignUpScreen = () => {
  const form = useForm({
    defaultValues,
  });

  const { step, isLastStep, nextStep, prevStep, isFirstStep } = useMultiform([
    <PersonalInfo control={form.control} />,
    <OtherInfo control={form.control} />,
    <AccountInfo form={form} control={form.control} />,
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

const AccountInfo = ({ form, control }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const image = result.assets[0].uri;
    setProfileImage(image);
    form.setValue("profile", image);
    if (!result.canceled) {
      setProfileImage(image);
    }
  };

  return (
    <View>
      <Text className="text-base font-bold mb-2 ">Profile</Text>
      <TouchableOpacity
        className="w-full  rounded-[5px] flex-row items-center bg-blue-200 border border-blue-800 mb-2"
        onPress={handlePickImage}>
        <Text className="px-4 py-2 rounded-[5px] border bg-blue-900 text-white mr-4">
          Upload Image
        </Text>
        <Text style={{ flexShrink: 1 }} className="">
          {profileImage
            ? profileImage
                .split("/")
                [profileImage.split("/").length - 1].substr(0, 18) + "...."
            : "No Image Choosen"}
        </Text>
      </TouchableOpacity>

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
