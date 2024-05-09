import { View, Text } from "react-native";
import React, { Suspense } from "react";
import InputField from "../../../../components/atoms/InputField";

const PersonalInfoStep = ({ control, error }) => {
  return (
    <View>
      <InputField
        controller={control}
        name="firstName"
        label={"First name"}
        placeholder="Enter your first name"
        errorMsg={error?.firstName?.message}
      />

      <InputField
        controller={control}
        name="lastName"
        label={"Last name"}
        placeholder="Enter your last name"
        errorMsg={error?.lastName?.message}
      />
    </View>
  );
};

export default PersonalInfoStep;
