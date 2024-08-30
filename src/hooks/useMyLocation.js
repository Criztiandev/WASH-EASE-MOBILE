import { useState } from "react";
import Geocoding from "react-native-geocoding";

// Initialize the Geocoding module with your API key
Geocoding.init("AIzaSyD2S3-_jyyJJLOJdCzEeGLY31egBsD4i1Y"); // Replace with your actual API key

const useMyLocation = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          const response = await Geocoding.from(latitude, longitude);
          if (response.results.length > 0) {
            setAddress(response.results[0].formatted_address);
          }
        } catch (error) {
          setError("Error fetching address");
        }

        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return { location, address, loading, error, getCurrentLocation };
};

export default useMyLocation;
