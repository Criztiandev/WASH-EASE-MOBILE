import { View, Text } from "react-native";
import React, { Suspense } from "react";
import InputField from "../../atoms/InputField";

const PersonalInfoStep = ({ control, error }) => {
  return (
    <View>
      <InputField
        controller={control}
        name="first_name"
        label={"First name"}
        placeholder="Enter your first name"
        errorMsg={error?.first_name?.message}
      />

      <InputField
        controller={control}
        name="last_name"
        label={"Last name"}
        placeholder="Enter your last name"
        errorMsg={error?.last_name?.message}
      />
    </View>
  );
};

export default PersonalInfoStep;
