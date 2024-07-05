import { View, Text, StyleSheet, Modal, Button } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import InputField from "../../atoms/InputField";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding"; // Ensure to install and configure this package

const OtherInfoStep = ({ form, control, error }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
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
      if (location) {
        getAddress(location.coords.latitude, location.coords.longitude);
      }
    })();
  }, []);

  useEffect(() => {
    if (address) {
      form.setValue("address", address);

      form.setValue("user_long", location.coords.longitude);
      form.setValue("user_lat", location.coords.latitude);
    }
  }, [address]);

  const getAddress = async (latitude, longitude) => {
    Geocoder.init("AIzaSyCUTRVpYG7yWdHnvU5QUxrulEhlXOegDTY"); // Replace with your API key
    Geocoder.from(latitude, longitude)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <View>
      <InputField
        controller={control}
        name="address"
        label={"Address"}
        placeholder="Enter your address"
        errorMsg={error?.address?.message}
      />

      <InputField
        controller={control}
        name="phone_number"
        label={"Phone number"}
        placeholder="Enter your phone number"
        errorMsg={error?.phone_number?.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
});

export default OtherInfoStep;
