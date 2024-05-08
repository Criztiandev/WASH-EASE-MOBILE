import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ProfileField = ({ label, children, onPick }) => {
  return (
    <>
      <Text className="text-base font-bold mb-2 ">{label}</Text>
      <TouchableOpacity
        className="w-full  rounded-[5px] flex-row items-center bg-blue-200 border border-blue-800 mb-2"
        onPress={onPick}>
        <Text className="px-4 py-2 rounded-[5px] border bg-blue-900 text-white mr-4">
          Upload Image
        </Text>
        <View>{children}</View>
      </TouchableOpacity>
    </>
  );
};

export default ProfileField;
