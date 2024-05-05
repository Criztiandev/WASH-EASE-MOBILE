import { View, Text, TextInput } from "react-native";
import React from "react";
import { cn } from "../../utils/dev.utils";
import { useController } from "react-hook-form";

const InputField = ({
  controller,
  name,
  label,
  className,
  keyboardType,
  contentClassName,
  labelClassName,
  isPassword = false,
  ...props
}) => {
  const { field } = useController({
    control: controller,
    name,
  });

  const defaultyStyle = cn("text-base", className);
  const containerStyle = cn("mb-4", contentClassName);
  const labelStyle = cn("text-base font-semibold mb-2", labelClassName);

  return (
    <View className={containerStyle}>
      {label && <Text className={labelStyle}>{label}</Text>}
      <View className="w-full  rounded-[5px] px-4 py-2 bg-blue-200 border border-blue-800">
        <TextInput
          secureTextEntry={isPassword}
          className={defaultyStyle}
          value={field.value}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          placeholder={props.placeholder}
        />
      </View>
    </View>
  );
};

export default InputField;
