import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Icon } from "react-native-paper";
import { router } from "expo-router";
import LocationIcon from "../../../../../assets/icons/location_icon.svg";
import LaundryShopIcon from "../../../../../assets/icons/shop_icon.svg";
import Button from "../../../../../components/atoms/Button";
import ScreenLayout from "../../../../../layout/ScreenLayout";

import { useAtomValue } from "jotai";
import { selectedCustomerAtom } from "../../../../../components/molecule/cards/TaskDetailsCard";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useCurrentLocation from "../../../../../hooks/useCurrentLocation";

const DashboardScreen = () => {
  const { location, errorMsg } = useCurrentLocation();

  return (
    <ScreenLayout>
      <View className="flex-1">
        <View className="h-[430px]">
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
              <Marker coordinate={Target} title="Target Location" />
              <MapViewDirections
                origin={location}
                destination={Target}
                apikey="AIzaSyCUTRVpYG7yWdHnvU5QUxrulEhlXOegDTY"
                mode="WALKING"
                strokeWidth={2}
              />
            </MapView>
          ) : (
            <Text>{errorMsg ? errorMsg : "Loading..."}</Text>
          )}
        </View>

        <View className="flex-1 border p-4 mb">
          <View className="p-3 space-y-4">
            <View className="flex-row items-center space-x-2">
              <Avatar.Icon />
              <Text
                variant="titleLarge"
                className="font-bold text-xl"
                style={{ flexShrink: 1 }}
              >
                {fullName || "John doe"}
              </Text>
            </View>

            <View className="opacity-50 space-y-2">
              <View
                className="flex-row items-center "
                style={{ flexShrink: 1 }}
              >
                <View className="mr-2">
                  <LocationIcon />
                </View>
                <Text className="text-[16px]" style={{ flexShrink: 1 }}>
                  {address}
                </Text>
              </View>

              <View
                className="flex-row items-center "
                style={{ flexShrink: 1 }}
              >
                <View className="mr-2">
                  <LaundryShopIcon />
                </View>
                <Text className="text-[16px]" style={{ flexShrink: 1 }}>
                  {phoneNumber}
                </Text>
              </View>

              <View className="flex-row items-center ">
                <View className="mr-2">
                  <Icon source={"information"} size={24} />
                </View>
                <Text className="text-[16px]">{status}</Text>
              </View>

              <View className="flex-row items-center ">
                <View className="mr-2">
                  <Icon source={"information"} size={24} />
                </View>
                <Text className="text-[16px]">{contact || "Contr"}</Text>
              </View>
            </View>

            <Button
              disabled={isReachLocation}
              onPress={() => console.log("hiu")}
            >
              Deliver
            </Button>
          </View>
        </View>
      </View>

      <View className="absolute top-0 right-0 mt-12 mr-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-[36px] h-[36px]  rounded-full flex justify-center items-center bg-red-300"
        >
          <Icon source="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default DashboardScreen;
