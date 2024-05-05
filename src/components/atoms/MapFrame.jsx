import MapView from "react-native-maps";
import React from "react";
import { cn } from "../../utils/dev.utils";
import { Card } from "react-native-paper";

const MapFrame = (props) => {
  const defastyle = cn(
    "h-[300px] border rounded-[5px] bg-white",
    props.className
  );
  return (
    <Card className="h-[300px] bg-white">
      <MapView className="w-full h-full" />
    </Card>
  );
};

export default MapFrame;
