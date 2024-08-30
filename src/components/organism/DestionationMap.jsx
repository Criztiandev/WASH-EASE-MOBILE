import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeroShopCard from "../molecule/cards/HeroShopCard";
import { cn } from "../../utils/dev.utils";
import { Icon } from "react-native-paper";
import MapViewDirections from "react-native-maps-directions";

const INITIAL_REGION = {
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

const DestionationMap = ({ region }) => {
  const [selectedLaundry, setSelectedLaundry] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateCamera(
        { center: region, zoom: 15 },
        { duration: 30 }
      );
    }
  }, [region]);

  return (
    <>
      <View className={cn(`${selectedLaundry && "h-[400]"}`)}>
        <MapView
          ref={mapRef}
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
          initialRegion={region || INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
        >
          <Marker coordinate={region}>
            <Callout>
              <View>
                <Text>Origin</Text>
              </View>
            </Callout>
          </Marker>

          <Marker coordinate={SampleMarker[1]}>
            <Callout>
              <View>
                <Text>Destination</Text>
              </View>
            </Callout>
          </Marker>
          <MapViewDirections
            origin={region}
            destination={SampleMarker[1]}
            apikey="AIzaSyD2S3-_jyyJJLOJdCzEeGLY31egBsD4i1Y"
            strokeWidth={3}
          />
        </MapView>
      </View>
    </>
  );
};

export default DestionationMap;
