import React from "react";
import { Redirect } from "expo-router";

const RootScreen = () => {
  return <Redirect href={"/signin"} />;
};

export default RootScreen;
