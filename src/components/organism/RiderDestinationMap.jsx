import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeroShopCard from "../molecule/cards/HeroShopCard";
import { cn } from "../../utils/dev.utils";
import { Icon } from "react-native-paper";
import MapViewDirections from "react-native-maps-directions";

const SampleMarker = [
  {
    id: 0,
    name: "M&L Laundry Hub Katuparan",
    latitude: 14.529320997312857,
    latitudeDelta: 0.0007312196869939669,
    longitude: 121.0552984289825,
    longitudeDelta: 0.0005977973341941833,
  },
];

const RiderDestinationMap = ({ id, region }) => {
  const mapRef = useRef(null);

  return (
    <>
      <View>
        <MapView
          ref={mapRef}
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
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

          <Marker coordinate={SampleMarker[0]}>
            <Callout>
              <View>
                <Text>Destination</Text>
              </View>
            </Callout>
          </Marker>

          <MapViewDirections
            origin={region}
            destination={SampleMarker[0]}
            apikey="AIzaSyD2S3-_jyyJJLOJdCzEeGLY31egBsD4i1Y"
            strokeWidth={3}
          />
        </MapView>
      </View>
    </>
  );
};

export default RiderDestinationMap;
