import React, { useCallback, useState } from "react";
import ScreenLayout from "../../../../../layout/ScreenLayout";
import LaundryShopMap from "../../../../../components/organism/LaundryShopMap.jsx";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import useCurrentLocation from "../../../../../hooks/useCurrentLocation";
import laundryApi from "../../../../../api/laundry.api";
import { Marker } from "react-native-maps";
import { View } from "react-native";
import { cn } from "../../../../../utils/dev.utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import LaundryShopDetails from "../../../../../components/organism/LaundryShopDetails";
import { useFocusEffect } from "expo-router";

const HomeScreen = () => {
  const { location, errorMsg } = useCurrentLocation();
  const [selectedLaundryShop, setSelectedLaundryShop] = useState(null);
  const { isLoading, isError, error, data, isFetchedAfterMount, refetch } =
    useQuery({
      queryFn: async () => await laundryApi.fetchAllLaundryShopLocation(),
      queryKey: ["home-laundry-shops"],
      refetchInterval: 30000,
    });

  if (isLoading) return <LoadingScreen />;

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
                key={shop.name}
                coordinate={{
                  ...shop.coords,
                }}
                onPress={() => setSelectedLaundryShop(shop)}
              />
            ))}
          </LaundryShopMap>
        )}
      </View>

      {selectedLaundryShop && (
        <View className="flex-1">
          <LaundryShopDetails
            id={selectedLaundryShop.id}
            name={selectedLaundryShop?.name}
            address={selectedLaundryShop.address}
            phone_number={selectedLaundryShop.phoneNumber}
          />

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
