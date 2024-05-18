import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PrivateBaseAxios } from "../api/base.api";

const useFetchMachine = ({ name, token }) => {
  return useQuery({
    queryKey: [name],
    queryFn: async () => {
      const response = await PrivateBaseAxios.get("laundry-shop/machines", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    },
  });
};

export default useFetchMachine;
