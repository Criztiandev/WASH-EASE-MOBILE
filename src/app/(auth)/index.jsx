import { View, Text } from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";

const RootScreen = () => {
  const [currenRole, setCurrentRole] = useState("user");

  const navigationRoute = {
    user: "/customer/home",
  };

  return <Redirect href={"/customer/home"} />;
};

export default RootScreen;
