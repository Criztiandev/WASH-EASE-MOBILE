import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { WebView } from "react-native-webview";
import { cn } from "../../utils/dev.utils";

const ShopDetails = {
  id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  title: "Second Item",
  image:
    "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
  details: {
    location: "Kahit Dito",
    schedule: "4:00 - 4:00 PM",
  },
  status: "open",
};

const INITIAL_REGION = {
  latitude: 12.65898181054623,
  latitudeDelta: 0.022982900224956637,
  longitude: 123.89491824433206,
  longitudeDelta: 0.027613677084445953,
};

const SampleMarker = [
  {
    id: 123123123,
    name: "Laundry Shop",
    latitude: 12.65898181054623,
    latitudeDelta: 0.022982900224956637,
    longitude: 123.89491824433206,
    longitudeDelta: 0.027613677084445953,
  },
];

const origin = {
  id: 123123123,
  name: "Laundry Shop",
  latitude: 12.65898181054623,
  latitudeDelta: 0.022982900224956637,
  longitude: 123.89491824433206,
  longitudeDelta: 0.027613677084445953,
};
const destination = {
  id: 123123123,
  name: "Pilar",
  latitude: 12.939630417092333,
  latitudeDelta: 0.04322934503153775,
  longitude: 123.6828438565135,
  longitudeDelta: 0.03045715391638737,
};

const DestinationMap = ({ data, height }) => {
  const [selectedLaundry, setSelectedLaundry] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current?.animateCamera(
      { center: INITIAL_REGION, zoom: 10 },
      { duration: 30 }
    );
  }, []);
  return (
    <>
      <WebView
        source={{ uri: "https://washease.online/private/map" }}
        style={{ flex: 1 }}
      />
    </>
  );
};

export default DestinationMap;
