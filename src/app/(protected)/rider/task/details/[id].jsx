import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import useCurrentLocation from "../../../../../hooks/useCurrentLocation";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Toast from "react-native-toast-message";
import Button from "../../../../../components/atoms/Button";
import { useAuthContext } from "../../../../../context/AuthContext";

const RootScreen = () => {
  const router = useRouter();
  const { authState } = useAuthContext();
  const { id } = useLocalSearchParams();
  const { location, errorMsg } = useCurrentLocation();
  const [isReachLocation, setIsReachLocation] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const result = await axios.post(
        `https://washease.online/api/get-rider-tasks/${id}`
      );
      return result?.data;
    },
    queryKey: [`request-service-${id}`],
  });

  const mutation = useMutation({
    mutationFn: async () =>
      await axios.put(
        `https://washease.online/api/laundry-shop/transactions/${id}`,
        { status: "COMPLETED" },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      ),
    mutationKey: [`rider-delivery-mutation-${id}`],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Confirmed, Thank you for your patience",
      });

      router.replace("/rider/home");
    },

    onError: (e) => {
      console.log(e);
    },
  });

  // Add this useEffect
  useEffect(() => {
    if (location && customer) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        customer.lat,
        customer.long
      );

      if (distance <= 0.1) {
        setIsReachLocation(true);
      }
    }
  }, [location, customer]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  const { customer } = data;

  // Helper function to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  return (
    <View className=" flex-1 ">
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          className="w-full h-full flex-1"
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsBuildings
          showsMyLocationButton
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
          />
          <Marker
            coordinate={{
              latitude: Number(customer?.lat),
              longitude: Number(customer?.long),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            title="Target Location"
          />
          <MapViewDirections
            origin={location}
            destination={{
              latitude: Number(customer?.lat),
              longitude: Number(customer?.long),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            apikey="AIzaSyCUTRVpYG7yWdHnvU5QUxrulEhlXOegDTY"
            mode="WALKING"
            strokeWidth={2}
          />
        </MapView>
      ) : (
        <View className="flex justify-center items-center">
          <Text>{errorMsg ? errorMsg : "Loading..."}</Text>
        </View>
      )}
      {isReachLocation && (
        <View className="absolute bottom-0 p-4 flex justify-center items-center w-full">
          <Button
            disabled={mutation.isPending}
            onPress={() => mutation.mutate({})}
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
