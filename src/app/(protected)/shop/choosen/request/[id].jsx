import { View, Text } from "react-native";
import React, { useState, useEffect, useRef, useMemo } from "react";
import MapViewDirections from "react-native-maps-directions";
import { useAuthContext } from "../../../../../context/AuthContext";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import useCurrentLocation from "../../../../../hooks/useCurrentLocation";
import LaundryShopMap from "../../../../../components/organism/LaundryShopMap";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import axios from "axios";
import { Marker } from "react-native-maps";
import Button from "../../../../../components/atoms/Button";
import Toast from "react-native-toast-message";
import Geocoding from "react-native-geocoding";

const GOOGLE_MAPS_API_KEY = "AIzaSyCUTRVpYG7yWdHnvU5QUxrulEhlXOegDTY";
const DISTANCE_THRESHOLD = 0.1; // km

Geocoding.init(GOOGLE_MAPS_API_KEY);

const interpolate = (start, end, steps) => {
  const stepLat = (end.latitude - start.latitude) / steps;
  const stepLng = (end.longitude - start.longitude) / steps;

  return Array.from({ length: steps }, (_, i) => ({
    latitude: start.latitude + stepLat * i,
    longitude: start.longitude + stepLng * i,
  }));
};

const useCustomerDetails = (id, authState) => {
  return useQuery({
    queryKey: [`request-service-${id}`],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `https://washease.online/api/laundry-shop/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        if (!result?.data) throw new Error("No data returned");

        const { data: Details } = result.data;
        const { address } = Details;
        const geocodeResponse = await Geocoding.from(address);

        if (geocodeResponse.results.length > 0) {
          const { lat, lng } = geocodeResponse.results[0].geometry.location;

          Details.avatar = null;
          return {
            ...Details,
            coords: {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
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

const useCompleteMutation = (authState, router, transactionID) => {
  return useMutation({
    mutationFn: async () =>
      await axios.put(
        `https://washease.online/api/laundry-shop/transactions/${transactionID}`,
        { status: "COMPLETED" },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      ),
    mutationKey: [`delivery-mutation-${transactionID}`],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Confirmed, Thank you for your patience",
      });
      router.replace("/customer/choosen-shop");
    },
    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Failed to complete the delivery",
      });
    },
  });
};

const RequestScreen = () => {
  const [isDelivered, setIsDelivered] = useState(false);
  const [riderLoc, setRiderLoc] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const { authState } = useAuthContext();
  const { location } = useCurrentLocation();
  const { id, transactionID } = useLocalSearchParams();
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);
  const interpolatedRouteRef = useRef([]);

  console.log(id);

  const router = useRouter();

  const { data, isLoading, isError, error } = useCustomerDetails(id, authState);
  const mutation = useCompleteMutation(authState, router, transactionID);

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

  useEffect(() => {
    if (data?.coords && location) {
      setRiderLoc(data.coords);
      Toast.show({
        type: "info",
        text1: "Your Laundry is being delivered",
      });
    }
  }, [data, location]);

  useEffect(() => {
    if (routeCoordinates.length > 1) {
      interpolatedRouteRef.current = routeCoordinates.slice(1).reduce(
        (acc, coord, index) => {
          const prevCoord = routeCoordinates[index];
          return [...acc, ...interpolate(prevCoord, coord, 100)];
        },
        [routeCoordinates[0]]
      );

      const simulateRiderMovement = () => {
        if (currentIndexRef.current < interpolatedRouteRef.current.length - 1) {
          currentIndexRef.current += 1;
          setRiderLoc(interpolatedRouteRef.current[currentIndexRef.current]);
        } else {
          setIsDelivered(true);
          clearInterval(intervalRef.current);
        }
      };

      intervalRef.current = setInterval(simulateRiderMovement, 64); // 20 updates per second

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [routeCoordinates]);

  if (!location || isLoading || !riderLoc) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <View className="flex-1">
      <LaundryShopMap initialRegion={mapRegion}>
        <Marker coordinate={location} title="Your Location" />
        <Marker coordinate={riderLoc} title="Driver Location" />
        <MapViewDirections
          origin={riderLoc}
          destination={location}
          apikey={GOOGLE_MAPS_API_KEY}
          mode="DRIVING"
          optimizeWaypoints={true}
          strokeWidth={3}
          strokeColor="#4A89F3"
          onReady={(result) => {
            setRouteCoordinates(result.coordinates);
          }}
        />
      </LaundryShopMap>

      {isDelivered && (
        <View className="absolute bottom-0 p-4 flex justify-center items-center w-full">
          <Button
            onPress={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Processing..." : "Order Received"}
          </Button>
        </View>
      )}

      <View className="absolute top-4 left-4 bg-white p-2 rounded-md">
        <Text className="font-bold">
          Status: {isDelivered ? "Delivered" : "On the way"}
        </Text>
      </View>
    </View>
  );
};

export default RequestScreen;
