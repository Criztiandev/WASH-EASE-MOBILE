import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ServiceItem from "../items/ServiceItem";
import ScreenLayout from "../../../layout/ScreenLayout";
import useStepManagement from "../../../hooks/useStepManagement";
import useMultiSelect from "../../../hooks/useSingleSelect";
import { useQuery } from "@tanstack/react-query";
import { PrivateBaseAxios } from "../../../api/base.api";
import { useAuthContext } from "../../../context/AuthContext";
import ErrorScreen from "../../atoms/ErrorScreen";
import LoadingScreen from "../../atoms/LoadingScreen";
import axios from "axios";
import useFetchService from "../../../hooks/useFetchService";

const MOCKDATA = [
  {
    id: 0,
    title: "Regular Wash",
    price: 70,
    description: `Description: 38 mins\nRegular Clothes (Max of 7kgs)\nMaong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 1,
    title: "Premium Wash",
    price: 75,
    description: `Description: 48 mins\nRegular Clothes (Max of 7kgs)\nMaong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 2,
    title: "Regular Dry",
    price: 70,
    description: `Description: 38 mins\nRegular Clothes (Max of 7kgs)\nMaong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 3,
    title: "Premium Dry",
    price: 75,
    description: `Description: 48 mins\nRegular Clothes (Max of 7kgs)\nMaong Pants & Thick Jackets (Max of 6kgs)`,
  },
  {
    id: 4,
    title: "Bedsheets/Curtains",
    price: 55.0,
    description: `Description: per kilo\n₱55.00/kg`,
  },
  {
    id: 5,
    title: "Blanket/Towel",
    price: 55,
    description: `Description: per kilo\n₱55.00/kg`,
  },
  {
    id: 6,
    title: "Comforter",
    price: 85,
    description: "Per kilo",
  },
];

const SelectServiceStep = ({ form, name, initialData = [] }) => {
  const { authState } = useAuthContext();
  const { selected, handleSelect } = useMultiSelect(initialData, form, name);
  useStepManagement({ name });
  const { data, isLoading, isError } = useFetchService({
    filter: "Basic Services",
    name: "basic-service",
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <ScreenLayout>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.headerText}>Select Service</Text>
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <ServiceItem
              key={item.id}
              id={item.id}
              payload={item}
              isActive={selected.some((current) => current.id === item.id)}
              onSelect={handleSelect}
            />
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
  },
});

export default SelectServiceStep;
