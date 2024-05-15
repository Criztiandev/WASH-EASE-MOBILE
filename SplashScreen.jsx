import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Button from "./src/components/atoms/Button";
import useMultiform from "./src/hooks/useMultiform";
import useLocalStorage from "./src/hooks/useLocalStorage";

const SplashScreen = () => {
  const { storeData } = useLocalStorage("splash");
  const { step, nextStep, isFinalStep } = useMultiform([
    <IntroScreen />,
    <ServiceScreen />,
    <LocationScreen />,
    <DeliveryScreen />,
  ]);

  const handleNextStep = () => {
    if (isFinalStep) {
      storeData({ isAlreadySplashed: true });
      return;
    }

    nextStep();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        gap: 64,
      }}>
      {step}

      <View style={{ width: "100%" }}>
        <Button onPress={handleNextStep}>Next</Button>
      </View>
    </View>
  );
};

export default SplashScreen;

const IntroScreen = () => {
  return (
    <>
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>WELCOME TO</Text>

        <View
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderRadius: 100,
          }}></View>
      </View>

      <View style={{ gap: 16 }}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          Effortless Clean, Delivered to Your Doorstep:{" "}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 64,
            fontWeight: "semibold",
          }}>
          Discover WashEase Laundry - Experience Freshness.
        </Text>
      </View>
    </>
  );
};

const ServiceScreen = () => {
  return (
    <>
      <View style={{ gap: 16 }}>
        <View
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderRadius: 100,
          }}></View>
      </View>

      <View style={{ gap: 16 }}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          Self Service
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 64,
            fontWeight: "semibold",
          }}>
          Self Service Enjoy Hassle-Free Self-Service!
        </Text>
      </View>
    </>
  );
};

const LocationScreen = () => {
  return (
    <>
      <View style={{ gap: 16 }}>
        <View
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderRadius: 100,
          }}></View>
      </View>

      <View style={{ gap: 16 }}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          We Pickup
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 64,
            fontWeight: "semibold",
          }}>
          WashEase delivery driver pick up your order
        </Text>
      </View>
    </>
  );
};

const DeliveryScreen = () => {
  return (
    <>
      <View style={{ gap: 16 }}>
        <View
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderRadius: 100,
          }}></View>
      </View>

      <View style={{ gap: 16 }}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          We Deliver
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 64,
            fontWeight: "semibold",
          }}>
          Your clothes are dropped off clean and ready to wear
        </Text>
      </View>
    </>
  );
};
