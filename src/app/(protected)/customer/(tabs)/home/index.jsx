import ScreenLayout from "../../../../../layout/ScreenLayout";
import CalloutMap from "../../../../../components/organism/CalloutMap";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useAuthContext } from "../../../../../context/AuthContext";

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ScreenLayout className="bg-[#f0f0f0]">
      <CalloutMap />
    </ScreenLayout>
  );
};

export default HomeScreen;
