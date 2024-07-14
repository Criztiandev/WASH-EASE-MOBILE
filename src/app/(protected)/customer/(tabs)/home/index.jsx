import React, { useEffect, useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import LaundryShopMap from "../../../../../components/organism/LaundryShopMap.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import useCurrentLocation from "../../../../../hooks/useCurrentLocation";
import laundryApi from "../../../../../api/laundry.api";
import { Marker } from "react-native-maps";
import { View } from "react-native";
import { cn } from "../../../../../utils/dev.utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import HeroShopCard from "../../../../../components/molecule/cards/HeroShopCard";
import { Icon } from "react-native-paper";
import LaundryShopDetails from "../../../../../components/organism/LaundryShopDetails";

const HomeScreen = () => {
  const { location, errorMsg } = useCurrentLocation();
  const [selectedLaundryShop, setSelectedLaundryShop] = useState(null);
  const { isLoading, isError, error, data, isFetchedAfterMount } = useQuery({
    queryFn: async () => await laundryApi.fetchAllLaundryShopLocation(),
    queryKey: ["home-laundry-shop"],
  });

  if (isLoading) return <LoadingScreen />;
  if (isError || errorMsg) {
    return <ErrorScreen message={error.message} />;
  }

  const initialRegion = {
    ...location,
    latitudeDelta: 0.0922 || 0,
    longitudeDelta: 0.0421 || 0,
  };

  return (
    <ScreenLayout className="bg-[#f0f0f0]">
      <View className={cn(selectedLaundryShop ? "h-[400px]" : "")}>
        {isFetchedAfterMount && (
          <LaundryShopMap region={initialRegion}>
            {data?.map((shop) => (
              <Marker
                key={shop.id}
                coordinate={{
                  ...shop.coords,
                }}
                onPress={() => setSelectedLaundryShop(shop.id)}
              />
            ))}
          </LaundryShopMap>
        )}
      </View>

      {selectedLaundryShop && (
        <View className="flex-1">
          <LaundryShopDetails id={selectedLaundryShop} />

          <View className="absolute top-0 right-0 mt-6 mx-6">
            <TouchableOpacity
              onPress={() => setSelectedLaundryShop(null)}
              className="w-[36px] h-[36px] rounded-full flex justify-center items-center bg-red-300"
            >
              <Icon source="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScreenLayout>
  );
};

export default HomeScreen;

// const handleMarkSelect = (location) => {
//   const _payload = data.find((items) => items.id === location.id);

//   if (!_payload) return;

//   const { id, laundry_location } = _payload;
//   const { laundry_shop_name, laundry_shop_address, laundry_shop_open_hours } =
//     laundry_location;

//   const transformedPayload = {
//     id: id,
//     title: laundry_shop_name || "Untitled Name",
//     image:
//       "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
//     details: {
//       location: laundry_shop_address || "Address is not available",
//       schedule: laundry_shop_open_hours || "Schedule is not Available",
//     },
//     status: _payload?.status || "Active",
//   };

//   setSelectedLaundry(transformedPayload);
// };
