import React from "react";
import { Redirect, router } from "expo-router";
import { atom, useAtomValue } from "jotai";

// Definition of atom for authentication status, initialized to null for clarity
export const AuthAtoms = atom(null);

const RootScreen = () => {
  const authAtomValue = useAtomValue(AuthAtoms);

  // Mapping of user types to routes
  const navigationRoute = {
    user: "/customer/home",
    rider: "/rider/home",
  };

  // Determine the route based on the atom value, default to sign-in page
  const currentRoute = navigationRoute[authAtomValue] || "/auth/sign-in";

  // Navigate to the determined route
  React.useEffect(() => {
    // Ensure navigation only if authAtomValue is null or not mapped correctly
    if (
      authAtomValue === null ||
      !navigationRoute.hasOwnProperty(authAtomValue)
    ) {
      router.navigate("/auth/sign-in");
    } else {
      router.navigate(currentRoute);
    }
  }, [currentRoute, authAtomValue]);

  return null;
};

export default RootScreen;
