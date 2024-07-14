import { View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
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

const interpolate = (start, end, steps) => {
  const stepLat = (end.latitude - start.latitude) / steps;
  const stepLng = (end.longitude - start.longitude) / steps;

  return Array.from({ length: steps }, (_, i) => ({
    latitude: start.latitude + stepLat * i,
    longitude: start.longitude + stepLng * i,
  }));
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

  const router = useRouter();

  const { isLoading, isError } = useQuery({
    queryFn: async () => {
      const result = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const { laundry_shops_location } = result.data;

      const foundLaundryShop = laundry_shops_location?.find(
        (shop) => shop.laundry_shop_id === Number(id)
      );

      if (foundLaundryShop && !riderLoc) {
        setRiderLoc({
          latitude: Number(foundLaundryShop.latitude),
          longitude: Number(foundLaundryShop.longitude),
        });
      }

      return foundLaundryShop || null;
    },
    queryKey: [`request-service-${id}`],
  });

  const mutation = useMutation({
    mutationFn: async () =>
      await axios.put(
        `https://washease.online/api/laundry-shop/transactions/${transactionID}`,
        { status: "COMPLETED" },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      ),
    mutationKey: [`delivery-mutatuin-${transactionID}`],
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Confirmed, Thank you for your patience",
      });

      router.replace("/customer/choosen-shop");
    },

    onError: (e) => {
      console.log(e);
    },
  });

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
        if (intervalRef.current || setIsDelivered(true)) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [routeCoordinates]);

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Your Laundry is being delivered",
    });
  }, []);

  if (!location || isLoading || !riderLoc) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <View className="flex-1">
      <LaundryShopMap>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
        />
        <Marker coordinate={riderLoc} title="Driver Location" />
        <MapViewDirections
          origin={riderLoc}
          destination={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          apikey="AIzaSyCUTRVpYG7yWdHnvU5QUxrulEhlXOegDTY"
          mode="WALKING"
          optimizeWaypoints={true}
          strokeWidth={2}
          onReady={(result) => {
            setRouteCoordinates(result.coordinates);
          }}
        />
      </LaundryShopMap>

      {isDelivered && (
        <View className="absolute bottom-0 p-4 flex justify-center items-center w-full">
          <Button onPress={() => mutation.mutate({})}>Order Recieved</Button>
        </View>
      )}
    </View>
  );
};

export default RequestScreen;
