import { useEffect, useState, useCallback, useMemo } from "react";
import * as Location from "expo-location";

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const updateLocation = useCallback((newLocation) => {
    if (newLocation && newLocation.coords) {
      const { latitude, longitude } = newLocation.coords;
      if (latitude && longitude) {
        setLocation(newLocation.coords);
      }
    }
  }, []);

  useEffect(() => {
    let subscriber;
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        if (currentLocation && currentLocation.coords) {
          const { latitude, longitude } = currentLocation.coords;
          if (latitude && longitude) {
            setLocation(currentLocation.coords);
          }
        }

        subscriber = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          updateLocation
        );
      } catch (error) {
        setErrorMsg(error.message);
      }
    })();

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [updateLocation]);

  const memoizedLocation = useMemo(() => location, [location]);

  return { location: memoizedLocation, errorMsg };
};

export default useCurrentLocation;
