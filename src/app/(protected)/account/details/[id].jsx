import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import Button from "../../../../components/atoms/Button";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/atoms/InputField";

const RootScreen = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <View className="flex-1 ">
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
        <ScrollView>
          <View className="justify-center items-center my-4">
            <Avatar.Image size={150} />
          </View>

          <View className="justify-between ">
            <View className="px-4">
              <InputField
                controller={form.control}
                name="firstName"
                label={"First Name"}
                placeholder="Enter your first name"
              />
              <InputField
                controller={form.control}
                name="lastName"
                label={"Last Name"}
                placeholder="Enter your last name"
              />
              <InputField
                controller={form.control}
                name={"address"}
                label={"Address"}
                placeholder="Enter your Address"
              />
              <InputField
                controller={form.control}
                label={"Phone number"}
                name={"phone"}
                keyboardType={"numeric"}
                placeholder="Enter your Contact"
              />
            </View>
            <View className="px-4 my-4">
              <Button onPress={form.handleSubmit(onSubmit)}>
                <Text className="text-xl text-white text-center font-bold">
                  Update
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RootScreen;
