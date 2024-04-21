import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Choosen Shop",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
