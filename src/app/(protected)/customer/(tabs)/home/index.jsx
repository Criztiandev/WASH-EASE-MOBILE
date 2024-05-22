import React, { useEffect, useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import CalloutMap from "../../../../../components/organism/CalloutMap";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";

const HomeScreen = () => {
  const [MapRender, setMapRender] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const laundryQuery = useQuery({
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://washease.online/api/get-all-laundry-shops"
        );
        return response.data.laundry_shops.data;
      } catch (error) {
        console.error("Error fetching laundry shops:", error);
        throw new Error("Failed to fetch laundry shops");
      }
    },
    queryKey: ["home-laundry-shop"],
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

  useEffect(() => {
    if (laundryQuery?.isFetched) {
      setMapRender(true);
    }
  }, [laundryQuery?.isFetched]);

  if (laundryQuery.isLoading) return <LoadingScreen />;
  if (laundryQuery.isError) {
    console.log(laundryQuery.error);
    return <ErrorScreen message={laundryQuery.error.message} />; // Pass error message to ErrorScreen
  }
  if (errorMsg) return <ErrorScreen message={errorMsg} />; // Pass error message to ErrorScreen

  console.log(laundryQuery.data);

  return (
    <ScreenLayout className="bg-[#f0f0f0]">
      {MapRender && <CalloutMap data={laundryQuery?.data} />}
    </ScreenLayout>
  );
};

export default HomeScreen;
