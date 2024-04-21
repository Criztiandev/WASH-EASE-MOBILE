import { View, Text } from "react-native";
import React, { useState } from "react";

const useMultiform = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((prev) => (prev >= steps.length - 1 ? prev : prev + 1));
  };

  const prevStep = () => {
    setCurrentStepIndex((prev) => (prev <= 0 ? prev : prev - 1));
  };

  const gotoStep = (step) => {
    if (typeof step !== "number") {
      return;
    }
    setCurrentStepIndex(step);
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    nextStep,
    prevStep,
    gotoStep,
  };
};

export default useMultiform;
