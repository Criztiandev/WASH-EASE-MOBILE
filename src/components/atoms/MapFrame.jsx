import React, { useRef } from "react";
import { cn } from "../../utils/dev.utils";
import { Card } from "react-native-paper";
import { Text, View } from "react-native";

// Aniate camera to navigate

// map ref current.animateCamera({center:location,zoom:10},{duration:10})

const onRegionChange = (value) => {
  console.log(value);
};

const onMarkerSelected = (marker) => {
  console.log(marker);
};

const MapFrame = (props) => {
  const mapRef = useRef();
  const defastyle = cn(
    "h-[300px] border rounded-[5px] bg-white",
    props.className
  );
  return <Card className="h-[300px] bg-white"></Card>;
};

export default MapFrame;
