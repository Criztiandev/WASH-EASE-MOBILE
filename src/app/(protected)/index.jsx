import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenLayout from "../../layout/ScreenLayout";
import { useAuthContext } from "../../context/AuthContext";
import { Redirect, useRouter } from "expo-router";

const determineRoute = (role) => {
  const routes = {
    Customer: "/customer/home",
    Rider: "/rider/home",
  };
  return routes[role] || "/";
};

const RootScreen = () => {
  const [currentRoute, setCurrentRoute] = useState("");
  const { authState } = useAuthContext();

  useEffect(() => {
    const { role } = authState;
    const currentRoute = determineRoute(role);
    setCurrentRoute(currentRoute);
  }, [authState]);

  return <Redirect href={currentRoute} />;
};

export default RootScreen;
