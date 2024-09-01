import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Toast from "react-native-toast-message";
import Geocoding from "react-native-geocoding";

import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import Button from "../../../../../components/atoms/Button";
import useCurrentLocation from "../../../../../hooks/useCurrentLocation";
import { useAuthContext } from "../../../../../context/AuthContext";

const GOOGLE_MAPS_API_KEY = "AIzaSyD2S3-_jyyJJLOJdCzEeGLY31egBsD4i1Y";
const DISTANCE_THRESHOLD = 0.1; // km

// Initialize the Geocoding module with your API key
Geocoding.init(GOOGLE_MAPS_API_KEY);

const useCustomerDetails = (id) => {
  return useQuery({
    queryKey: [`request-service-${id}`],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `https://washeaselaundry.online/api/get-customer-details/${id}`
        );

        if (!result?.data) throw new Error("No data returned");

        const { address } = result.data;
        const geocodeResponse = await Geocoding.from(address);

        if (geocodeResponse.results.length > 0) {
          const { lat, lng } = geocodeResponse.results[0].geometry.location;
          return {
            ...result.data,
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
        }
        throw new Error("Geocoding failed");
      } catch (error) {
        console.error("Error fetching customer details:", error);
        throw error;
      }
    },
  });
};

const useCompleteMutation = (authState, router) => {
  return useMutation({
    mutationFn: (id) =>
      axios.put(
        `https://washeaselaundry.online/api/laundry-shop/transactions/${id}`,
        { status: "COMPLETED" },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      ),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Confirmed, Thank you for your patience",
      });
      router.replace("/rider/home");
    },
    onError: (e) => console.error("Mutation error:", e),
  });
};

const RootScreen = () => {
  const router = useRouter();
  const { authState } = useAuthContext();
  const { id, transactionID } = useLocalSearchParams();
  const { location, errorMsg } = useCurrentLocation();
  const [isReachLocation, setIsReachLocation] = useState(false);

  const { data, isLoading, isError, error } = useCustomerDetails(id);
  const mutation = useCompleteMutation(authState, router);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }, []);

  useEffect(() => {
    if (location && data?.latitude && data?.longitude) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        data.latitude,
        data.longitude
      );
      setIsReachLocation(distance <= DISTANCE_THRESHOLD);
    }
  }, [location, data, calculateDistance]);

  const mapRegion = useMemo(() => {
    return location
      ? {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      : null;
  }, [location]);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    console.log(error);
    return error.message === "Failed to fetch rider tasks" ? (
      <View className="flex-1 justify-center items-center">
        <Text className="text-[24px] font-bold text-center px-8">
          Transaction Not Found! No location set.
        </Text>
      </View>
    ) : (
      <ErrorScreen />
    );
  }

  return (
    <View className="flex-1">
      {mapRegion ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          className="w-full h-full flex-1"
          initialRegion={mapRegion}
          showsUserLocation
          showsBuildings
          showsMyLocationButton
        >
          <Marker coordinate={location} title="Your Location" />
          {data?.latitude && data?.longitude && (
            <>
              <Marker
                coordinate={{
                  latitude: Number(data.latitude),
                  longitude: Number(data.longitude),
                }}
                title="Target Location"
              />
              <MapViewDirections
                origin={location}
                destination={{
                  latitude: Number(data.latitude),
                  longitude: Number(data.longitude),
                }}
                apikey={GOOGLE_MAPS_API_KEY}
                mode="WALKING"
                strokeWidth={2}
              />
            </>
          )}
        </MapView>
      ) : (
        <View className="flex justify-center items-center">
          <Text>{errorMsg || "Loading map..."}</Text>
        </View>
      )}
      {isReachLocation && (
        <View className="absolute bottom-0 p-4 flex justify-center items-center w-full">
          <Button
            disabled={mutation.isPending}
            onPress={() => mutation.mutate(transactionID)}
            className={`w-[300px] ${
              mutation.isPending ? "opacity-50" : "opacity-100"
            }`}
          >
            Deliver
          </Button>
        </View>
      )}
    </View>
  );
};

export default RootScreen;
