import React from "react";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "jotai";
import Toast from "react-native-toast-message";

const _layout = () => {
  return (
    <>
      <Provider>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </Provider>
      <Toast />
    </>
  );
};

export default _layout;
