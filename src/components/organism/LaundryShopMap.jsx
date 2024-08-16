import { useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import LoadingScreen from "../atoms/LoadingScreen";

const LaundryShopMap = ({ region, children }) => {
  const mapRef = useRef(null);
  const { location } = useCurrentLocation();

  const initialRegion = {
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (!location) return <LoadingScreen />;

  return (
    <MapView
      ref={mapRef}
      className="w-full h-full"
      
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
    >
      {children}
    </MapView>
  );
};

export default LaundryShopMap;
