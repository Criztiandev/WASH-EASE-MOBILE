import { View, Text } from "react-native";
import React, { Suspense, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ProfileField from "../../atoms/ProfileField";
import InputField from "../../atoms/InputField";

const AccountInfoStep = ({ form, control, error }) => {
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
      <ProfileField label="Profile" onPick={handlePickImage}>
        <Text style={{ flexShrink: 1 }} className="">
          {profileImage
            ? profileImage
                .split("/")
                [profileImage.split("/").length - 1].substr(0, 18) + "...."
            : "No Image Choosen"}
        </Text>
      </ProfileField>

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
