import { Redirect } from "expo-router";
import React from "react";

const RootPage = () => {
  return <Redirect href={"/auth/sign-in"} />;
};

export default RootPage;
