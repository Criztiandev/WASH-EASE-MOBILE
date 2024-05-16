import { View, Text } from "react-native";
import React, { Suspense, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ProfileField from "../../atoms/ProfileField";
import InputField from "../../atoms/InputField";

const AccountInfoStep = ({ form, control, error }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePicked = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!pickerResult.canceled && pickerResult.assets) {
      const pickedImageUri = pickerResult.assets[0].uri;
      setProfileImage(pickedImageUri.split("/").pop().toLowerCase());
      console.log(pickerResult.assets);
      form.setValue("avatar", pickedImageUri);
    }
  };

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
