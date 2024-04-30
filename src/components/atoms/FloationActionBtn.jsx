import { View, Text, Dimensions, Touchable } from "react-native";
import React from "react";
import Button from "./Button";
import { cn } from "../../utils/dev.utils";

const FloationActionBtn = ({ label, ...props }) => {
  const defaultyStyle = cn("", props.className);

  return (
    <View
      className="absolute bottom-0 mx-4 mb-2 flex-1 "
      style={{
        width: Dimensions.get("screen").width - 32,
      }}>
      <Button className={defaultyStyle} {...props}>
        <Text className="text-lg font-bold text-center text-white">
          {label}
        </Text>
      </Button>
    </View>
  );
};

export default FloationActionBtn;
