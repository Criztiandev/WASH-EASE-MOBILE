import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Profile",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
