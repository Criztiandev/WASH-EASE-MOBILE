import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React from "react";
import { cn } from "../../utils/dev.utils";
import { Card } from "react-native-paper";

const INITIAL_REGION = {
  latitude: 12.3667,
  longitude: 123.6167,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const MapFrame = (props) => {
  const defastyle = cn(
    "h-[300px] border rounded-[5px] bg-white",
    props.className
  );
  return (
    <Card className="h-[300px] bg-white">
      <MapView
        className="w-full h-full"
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
      />
    </Card>
  );
};

export default MapFrame;
