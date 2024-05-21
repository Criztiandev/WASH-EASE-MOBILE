import { View, Text } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";

const useFullServiceForm = () => {
  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-cleaning": [],
      "basic-ironing": [],
      "basic-material": [],
      "payment-method": "",
      "delivery-method": "",
      total: 0,
    },
  });
};

export default useFullServiceForm;
