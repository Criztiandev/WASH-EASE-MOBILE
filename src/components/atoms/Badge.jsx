import { View, Text } from "react-native";
import React from "react";
import { cn } from "../../utils/dev.utils";

const Badge = ({ children, ...props }) => {
  const defaultStyle = cn(
    "absolute top-1  px-4 py-1 rounded dark:bg-blue-900 rounded-full",
    props.className
  );

  return (
    <View {...props} className={defaultStyle}>
      {children}
    </View>
  );
};

export default Badge;
