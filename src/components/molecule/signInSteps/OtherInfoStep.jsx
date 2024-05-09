import { View, Text } from "react-native";
import React, { Suspense } from "react";
import InputField from "../../atoms/InputField";

const OtherInfoStep = ({ control, error }) => {
  return (
    <View>
      <InputField
        controller={control}
        name="address"
        label={"Address"}
        placeholder="Enter your address"
        errorMsg={error?.address?.message}
      />

      <InputField
        controller={control}
        name="phone_number"
        label={"Phone number"}
        placeholder="Enter your phone number"
        errorMsg={error?.phone_number?.message}
      />
    </View>
  );
};

export default OtherInfoStep;
