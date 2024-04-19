import { View, Text } from "react-native";
import React from "react";
import { cn } from "../../utils/dev.utils";

const MapFrame = (props) => {
  const defastyle = cn(
    "h-[300px] border rounded-[5px] bg-white",
    props.className
  );
  return (
    <View {...props} className={defastyle}>
      <Text>Map</Text>
    </View>
  );
};

export default MapFrame;
