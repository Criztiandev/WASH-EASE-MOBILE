import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeroShopCard from "../molecule/cards/HeroShopCard";
import { cn } from "../../utils/dev.utils";
import { Icon } from "react-native-paper";

const ShopDetails = [
  {
    id: 0,
    title: "M&L Laundry Hub Katuparan",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "88 3rd St Taguig, Metro Manila",
      schedule: "7:00 AM - 8:00 PM",
    },
    status: "open",
  },
  {
    id: 1,
    title: "M&L Laundry Hub Pinagsama",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: " Phase 2, Balai Magayon, Taguig, Metro Manila",
      schedule: "7:00 AM - 7:00 PM",
    },
    status: "open",
  },

  {
    id: 2,
    title: "LABAsics Laundry House North Signal",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "44 Sampaloc Extension, Taguig, Metro Manila",
      schedule: ": 7:00 AM - 8:00 PM",
    },
    status: "open",
  },

  {
    id: 3,
    title: "Instawash Laundry Shop",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: " Unit A5 & A6, Block 10 Lot 11, Taguig",
      schedule: ": 9:00 AM - 5:00 PM",
    },
    status: "close",
  },
];

const INITIAL_ROUTE = {
  latitude: 14.529320997312857,
  latitudeDelta: 0.0007312196869939669,
  longitude: 121.0552984289825,
  longitudeDelta: 0.0005977973341941833,
};

const SampleMarker = [
  {
    id: 0,
    name: "M&L Laundry Hub Katuparan",
    latitude: 14.529320997312857,
    latitudeDelta: 0.0007312196869939669,
    longitude: 121.0552984289825,
    longitudeDelta: 0.0005977973341941833,
  },
  {
    id: 1,
    name: "M&L Laundry Hub Pinagsama",
    latitude: 14.52404037436871,
    latitudeDelta: 0.011132136239515589,
    longitude: 121.04576015844941,
    longitudeDelta: 0.011315234005451202,
  },
  {
    id: 2,
    name: "LABAsics Laundry House North Signal",
    latitude: 14.522441280687332,
    latitudeDelta: 0.008746672168784997,
    longitude: 121.06050526723266,
    longitudeDelta: 0.006326995790018941,
  },

  {
    id: 3,
    name: ". Instawash Laundry Shop",
    latitude: 14.515856308904931,
    latitudeDelta: 0.002146080292135366,
    longitude: 121.04783803224564,
    longitudeDelta: 0.0018922984600067139,
  },
];

const CalloutMap = ({ data, currentRegion }) => {
  const [payload, setPayload] = useState([]);
  const [selectedLaundry, setSelectedLaundry] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current?.animateCamera(
      { center: INITIAL_ROUTE, zoom: 15 },
      { duration: 30 }
    );
  }, []);

  const handleMarkSelect = (location) => {
    const payload = ShopDetails[location.id];
    setSelectedLaundry(payload);
  };
  const handlRegionChange = (value) => {
    // console.log(value);
  };

  return (
    <>
      <View className={cn(`${selectedLaundry && "h-[400]"}`)}>
        <MapView
          ref={mapRef}
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
          initialRegion={currentRegion}
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
