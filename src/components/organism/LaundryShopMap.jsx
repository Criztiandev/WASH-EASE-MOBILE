import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeroShopCard from "../molecule/cards/HeroShopCard";
import { cn } from "../../utils/dev.utils";
import { Icon } from "react-native-paper";

const LaundryShopMap = ({ region, children }) => {
  const mapRef = useRef(null);

  return (
    <MapView
      ref={mapRef}
      className="w-full h-full"
      provider={PROVIDER_GOOGLE}
      initialRegion={region || INITIAL_REGION}
      showsUserLocation
      showsMyLocationButton
    >
      {children}
    </MapView>
  );
};

export default LaundryShopMap;
