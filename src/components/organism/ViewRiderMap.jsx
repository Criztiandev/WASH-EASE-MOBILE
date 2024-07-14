import { View, Text } from "react-native";
import React from "react";
import LaundryShopMap from "./LaundryShopMap";
import useCurrentLocation from "../../hooks/useCurrentLocation";

const ViewRiderMap = () => {
  const { location } = useCurrentLocation();

  const target = {
    latitude: location?.latitude,
    longitude: location?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View>
      <LaundryShopMap region={target}></LaundryShopMap>
    </View>
  );
};

export default ViewRiderMap;
