import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeroShopCard from "../molecule/cards/HeroShopCard";
import { cn } from "../../utils/dev.utils";
import { Icon } from "react-native-paper";

function generateRandomCoord() {
  // Calculate min and max latitude and longitude to create a bounding box
  const startA = {
    latitude: 14.51791390637404,
    latitudeDelta: 0.025037045796684865,
    longitude: 121.03191526606679,
    longitudeDelta: 0.01575428992509842,
  };
  const startB = {
    latitude: 14.549215147855762,
    latitudeDelta: 0.013386962762849564,
    longitude: 121.06690099462867,
    longitudeDelta: 0.008424483239664937,
  };
  const startC = {
    latitude: 14.542305668939488,
    latitudeDelta: 0.005912698039141517,
    longitude: 121.07642250135541,
    longitudeDelta: 0.0037212297320223797,
  };
  const startD = {
    latitude: 14.498049376211195,
    latitudeDelta: 0.022147109284967215,
    longitude: 121.05647491291165,
    longitudeDelta: 0.013336949050426483,
  };

  const minLat = Math.min(
    startA.latitude,
    startB.latitude,
    startC.latitude,
    startD.latitude
  );
  const maxLat = Math.max(
    startA.latitude,
    startB.latitude,
    startC.latitude,
    startD.latitude
  );
  const minLon = Math.min(
    startA.longitude,
    startB.longitude,
    startC.longitude,
    startD.longitude
  );
  const maxLon = Math.max(
    startA.longitude,
    startB.longitude,
    startC.longitude,
    startD.longitude
  );

  // Generate random latitude and longitude within the bounding box
  const latitude = minLat + Math.random() * (maxLat - minLat);
  const longitude = minLon + Math.random() * (maxLon - minLon);

  // Calculate average latitudeDelta and longitudeDelta
  const averageLatitudeDelta =
    (startA.latitudeDelta +
      startB.latitudeDelta +
      startC.latitudeDelta +
      startD.latitudeDelta) /
    4;
  const averageLongitudeDelta =
    (startA.longitudeDelta +
      startB.longitudeDelta +
      startC.longitudeDelta +
      startD.longitudeDelta) /
    4;

  // Return the generated coordinate
  return {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: averageLatitudeDelta,
    longitudeDelta: averageLongitudeDelta,
  };
}

function calculateCoordinates(coord) {
  if (!coord) return;

  const accuracy = coord.accuracy;
  const latitude = coord.latitude;
  const longitude = coord.longitude;

  // Earth's radius in meters
  const earthRadius = 6378137;

  // Calculate latitudeDelta and longitudeDelta in degrees
  const latitudeDelta = (accuracy * 2) / (earthRadius * (Math.PI / 180));
  const longitudeDelta =
    (accuracy * 2) /
    (earthRadius * Math.cos(latitude * (Math.PI / 180)) * (Math.PI / 180));

  return {
    latitude: latitude,
    latitudeDelta: latitudeDelta,
    longitude: longitude,
    longitudeDelta: longitudeDelta,
  };
}

const INITIAL_REGION = {
  latitude: 14.529320997312857,
  latitudeDelta: 0.0007312196869939669,
  longitude: 121.0552984289825,
  longitudeDelta: 0.0005977973341941833,
};

const CalloutMap = ({ data = [] }) => {
  console.log(data);

  const [payload, setPayload] = useState([]);
  const [selectedLaundry, setSelectedLaundry] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current?.animateCamera(
      { center: INITIAL_REGION, zoom: 12 },
      { duration: 30 }
    );
  }, []);

  const handleMarkSelect = (location) => {
    const _payload = data?.find((items) => items.id === location.id);

    const transformedPayload = {
      id: _payload?.id,
      title: _payload?.laundry_shop_name || "Untitled Name",
      image:
        "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
      details: {
        location:
          _payload?.laundry_shop_address ||
          " Unit A5 & A6, Block 10 Lot 11, Taguig",
        schedule: ": 9:00 AM - 5:00 PM",
      },
      status: _payload?.status,
    };

    setSelectedLaundry(transformedPayload);
  };
  const handlRegionChange = (value) => {
    console.log(selectedLaundry);
    // console.log(value);
  };

  useEffect(() => {
    if (data) {
      const generateShopCoords = data?.map((items) => ({
        id: items.id,
        name: items.laundry_shop_name,
        ...generateRandomCoord(),
      }));
      setPayload(generateShopCoords);
    }
  }, [data]);

  return (
    <>
      <View className={cn(`${selectedLaundry && "h-[400]"}`)}>
        <MapView
          ref={mapRef}
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          onRegionChangeComplete={handlRegionChange}>
          {payload.map((location) => (
            <Marker
              key={location.name}
              coordinate={location}
              onPress={() => handleMarkSelect(location)}>
              <Callout>
                <View>
                  <Text>{location.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      {selectedLaundry && (
        <>
          <TouchableOpacity
            className="flex-1"
            onPress={() => router.push(`/shop/details/${selectedLaundry.id}`)}>
            <HeroShopCard {...selectedLaundry} />
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

export default CalloutMap;
