import React, { useEffect } from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { AuthAtom } from "../../service/states/auth.atoms";

const RootLayout = () => {
  const authValue = useAtomValue(AuthAtom);
  const router = useRouter();

  useEffect(() => {
    const { isAuthenticated } = authValue;
    if (isAuthenticated === false || isAuthenticated === null) {
      router.replace("/");
    }
  }, [authValue]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default RootLayout;
