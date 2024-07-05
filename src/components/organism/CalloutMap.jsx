import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import HeroShopCard from "../molecule/cards/HeroShopCard";
import { cn } from "../../utils/dev.utils";
import { Icon } from "react-native-paper";

const INITIAL_REGION = {
  latitude: 14.529320997312857,
  latitudeDelta: 0.0007312196869939669,
  longitude: 121.0552984289825,
  longitudeDelta: 0.0005977973341941833,
};

const CalloutMap = ({ data = [], region }) => {
  const [selectedLaundry, setSelectedLaundry] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateCamera(
        { center: region, zoom: 15 },
        { duration: 30 }
      );
    }
  }, [region]);

  const handleMarkSelect = (location) => {
    const _payload = data.find((items) => items.id === location.id);

    if (!_payload) return;

    const { id, laundry_location } = _payload;
    const { laundry_shop_name, laundry_shop_address, laundry_shop_open_hours } =
      laundry_location;

    const transformedPayload = {
      id: id,
      title: laundry_shop_name || "Untitled Name",
      image:
        "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
      details: {
        location: laundry_shop_address || "Address is not available",
        schedule: laundry_shop_open_hours || "Schedule is not Available",
      },
      status: _payload?.status || "Active",
    };

    setSelectedLaundry(transformedPayload);
  };

  // What is this ?
  const MapList = data
    .map((items) => {
      if (items.coords && items?.laundry_location?.laundry_shop_name) {
        return {
          id: items.id,
          name: items?.laundry_location?.laundry_shop_name || "Shop Name",
          latitude: parseFloat(items.latitude) || 0,
          latitudeDelta: parseFloat(items.latitudeDelta) || 0,
          longitude: parseFloat(items.longitude) || 0,
          longitudeDelta: parseFloat(items.longitudeDelta) || 0,
        };
      }
      return null;
    })
    .filter((item) => item !== null);
  return (
    <>
      <View className={cn(selectedLaundry ? "h-[400]" : "")}>
        <MapView
          ref={mapRef}
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
          initialRegion={region || INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
        >
          {MapList.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              onPress={() => handleMarkSelect(marker)}
            />
          ))}
        </MapView>
      </View>

      {selectedLaundry && (
        <>
          <TouchableOpacity
            className="flex-1"
            onPress={() => router.push(`/shop/details/${selectedLaundry.id}`)}
          >
            <HeroShopCard {...selectedLaundry} />
          </TouchableOpacity>

          <View className="absolute top-0 right-0 mt-12 mr-4">
            <TouchableOpacity
              onPress={() => setSelectedLaundry(null)}
              className="w-[36px] h-[36px] rounded-full flex justify-center items-center bg-red-300"
            >
              <Icon source="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default CalloutMap;
