import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ScreenLayout from "../../layout/ScreenLayout";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

const determineRoute = (role) => {
  const routes = {
    user: "/customer/home",
    rider: "/rider/home",
  };
  return routes[role] || "/";
};

const RootScreen = () => {
  const { authState } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    const { role } = authState;
    const currentRoute = determineRoute(role);
    router.replace(currentRoute);
  }, [authState]);

  return (
    <ScreenLayout>
      <Text>hi</Text>
    </ScreenLayout>
  );
};

export default RootScreen;
