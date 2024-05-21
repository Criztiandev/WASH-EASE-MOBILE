import React, { useEffect, useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import CalloutMap from "../../../../../components/organism/CalloutMap";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";

const fetchLaundryShops = async () => {
  try {
    const response = await axios.get(
      "https://washease.online/api/get-all-laundry-shops"
    );
    return response.data.laundry_shops.data;
  } catch (error) {
    throw new Error("Failed to fetch laundry shops");
  }
};

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["laundry-shops"],
    queryFn: fetchLaundryShops,
  });

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg("Failed to get current location");
      }
    })();
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  if (errorMsg) return <ErrorScreen message={errorMsg} />;

  return (
    <ScreenLayout className="bg-[#f0f0f0]">
      <CalloutMap data={data} currentRegion={location?.coords} />
    </ScreenLayout>
  );
};

export default HomeScreen;
