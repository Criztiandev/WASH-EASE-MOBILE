import { View, Text } from "react-native";
import React, { Suspense } from "react";
import InputField from "../../../../components/atoms/InputField";

const OtherInfoStep = ({ control, error }) => {
  return (
    <Suspense
      fallback={
        <View>
          <Text>LOading</Text>
        </View>
      }>
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
          name="contact"
          label={"Phone number"}
          placeholder="Enter your phone number"
          errorMsg={error?.contact?.message}
        />
      </View>
    </Suspense>
  );
};

export default OtherInfoStep;
