import { View, Text } from "react-native";
import React, { useCallback } from "react";
import axios from "axios";
import * as Crypto from "expo-crypto";
import { useAuthContext } from "../context/AuthContext";

const useFetchTransactionHistory = () => {
  const { authState } = useAuthContext();
  return useCallback(async () =>  async () => {
      try {
        const result = await axios.get(
          `https://washeaselaundry.online/api/get-customer-transactions/${authState["user_id"]}/`
        );
        return result?.data || [];
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(`Server error: ${error.response.status}`);
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Error: ${error.message}`);
        }
      }
    }, [authState]);
};

export default useFetchTransactionHistory;
