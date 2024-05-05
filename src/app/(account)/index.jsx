import { View, Text } from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";

const RootScreen = () => {
  const [currentRole, setCurrentRole] = useState("user");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const routePath = {
    user: "/customer/home",
    rider: "/rider/home",
  };

  return <Redirect href={routePath[currentRole]} />;
};

export default RootScreen;
