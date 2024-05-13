import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeroShopCard from "../molecule/cards/HeroShopCard";
import { cn } from "../../utils/dev.utils";
import MapViewDirections from "react-native-maps-directions";
import { Icon } from "react-native-paper";

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

  const handleMarkSelect = (location) => {
    setSelectedLaundry({ id: location.id, name: location.id });
  };
  const handlRegionChange = (value) => {
    console.log(value);
  };

  useEffect(() => {
    mapRef.current?.animateCamera(
      { center: INITIAL_REGION, zoom: 10 },
      { duration: 30 }
    );
  }, []);
  return (
    <>
      <View
        className={cn(`${selectedLaundry && "h-[300]"}`)}
        style={{ height: height }}>
        <MapView
          ref={mapRef}
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          onRegionChangeComplete={handlRegionChange}>
          <Marker
            coordinate={origin}
            onPress={() => handleMarkSelect(origin.id)}></Marker>
          <Marker
            coordinate={destination}
            onPress={() => handleMarkSelect(destination.id)}></Marker>

          <MapViewDirections origin={origin} destination={destination} />
        </MapView>
      </View>

      {selectedLaundry && (
        <>
          <TouchableOpacity
            className="flex-1"
            onPress={() => router.push(`/shop/details/${selectedLaundry.id}`)}>
            <HeroShopCard {...ShopDetails} label={"Accept"} />
          </TouchableOpacity>

          <View className="absolute top-0 right-0 mt-12 mr-4">
            <TouchableOpacity
              onPress={() => setSelectedLaundry(null)}
              className="w-[36px] h-[36px]  rounded-full flex justify-center items-center bg-red-300">
              <Icon source="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default DestinationMap;
