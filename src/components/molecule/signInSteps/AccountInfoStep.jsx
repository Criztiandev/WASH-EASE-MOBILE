import { View, Text } from "react-native";
import React, { Suspense, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ProfileField from "../../atoms/ProfileField";
import InputField from "../../atoms/InputField";

const AccountInfoStep = ({ form, control, error }) => {
  return (
    <View>
      <InputField
        controller={control}
        name="email"
        label={"Email"}
        placeholder="Enter your email"
        errorMsg={error?.email?.message}
      />

      <InputField
        isPassword
        controller={control}
        name="password"
        label={"Password"}
        placeholder="Password"
        errorMsg={error?.password?.message}
      />
    </View>
  );
};
export default AccountInfoStep;
