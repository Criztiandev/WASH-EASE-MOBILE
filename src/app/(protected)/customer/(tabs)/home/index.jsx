import React, { useEffect, useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import CalloutMap from "../../../../../components/organism/CalloutMap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import * as Location from "expo-location";

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitudeDelta, setLongitudeDelta] = useState(null);
  const [latitudeDelta, setLatitudeDelta] = useState(null);
  const distance = 100; // in kilometers

  const laundryQuery = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const { laundry_shops_location } = response.data;

      // transform coordinatiopn

      const transformedPayload = laundry_shops_location?.map((shops) => {
        const { latitude, longitude } = shops;
        const longitudeDelta =
          distance / (111 * Math.cos(latitude * (Math.PI / 180)));
        const latitudeDelta = distance / 111;

        return {
          ...shops,
          coords: {
            latitude: Number(latitude) || 0,
            latitudeDelta: Number(latitudeDelta) || 0,
            longitude: Number(longitude) || 0,
            longitudeDelta: Number(longitudeDelta) || 0,
          },
        };
      });

      return transformedPayload;
    },
    queryKey: ["home-laundry-shop"],
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location) {
        const { latitude } = location.coords;

        // Calculate the longitude delta
        const longitudeDelta =
          distance / (111 * Math.cos(latitude * (Math.PI / 180)));
        setLongitudeDelta(longitudeDelta);

        // Calculate the latitude delta
        const latitudeDelta = distance / 111;
        setLatitudeDelta(latitudeDelta);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (laundryQuery.isLoading) return <LoadingScreen />;
  if (laundryQuery.isError) {
    console.log(laundryQuery.error);
    return <ErrorScreen message={laundryQuery.error.message} />;
  }

  const initialRegion = {
    latitude: Number(location?.coords?.latitude) || 0,
    latitudeDelta: Number(location?.coords?.latitude) || 0,
    longitude: Number(location?.coords?.longitude) || 0,
    longitudeDelta: Number(longitudeDelta) || 0,
  };

  return (
    <ScreenLayout className="bg-[#f0f0f0]">
      <CalloutMap data={laundryQuery?.data || []} region={initialRegion} />
    </ScreenLayout>
  );
};

export default HomeScreen;
