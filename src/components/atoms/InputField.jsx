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
  ...props
}) => {
  const { field } = useController({
    control: controller,
    name,
  });

  const defaultyStyle = cn("mb-4", className);

  return (
    <View className={defaultyStyle}>
      <Text className="text-[16px] mb-2 font-semibold">{label}</Text>
      <View
        className={"w-full  px-4 py-2 rounded-[5px] border border-gray-300"}>
        <TextInput
          value={field.value}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          placeholder={props.placeholder}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default InputField;
