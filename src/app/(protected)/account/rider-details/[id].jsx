import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Icon, IconButton } from "react-native-paper";
import Button from "../../../../components/atoms/Button";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/atoms/InputField";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { useAuthContext } from "../../../../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import LoadingScreen from "../../../../components/atoms/LoadingScreen";

// Initialize Geocoder outside of the component
Geocoder.init("AIzaSyD2S3-_jyyJJLOJdCzEeGLY31egBsD4i1Y"); // Replace with your API key

const getAddress = async (latitude, longitude) => {
  try {
    const json = await Geocoder.from(latitude, longitude);
    return json.results[0].formatted_address;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const useFetchUserData = (id) => {
  return useQuery({
    queryFn: async () => {
      const result = await axios.post(
        `https://washease.online/api/get-rider-details/${id}`
      );

      const { data: riderDetails } = result.data;

      return {
        id,
        ...riderDetails,
      };
    },
    queryKey: [`user-profile-${id}`],
  });
};

const RootScreen = () => {
  const { authState } = useAuthContext();
  const { user_id, token } = authState;
  const [location, setLocation] = useState(null);

  const form = useForm();

  const { isLoading, isError, refetch, data, error } =
    useFetchUserData(user_id);

  const mutation = useMutation({
    mutationFn: async (value) =>
      await axios.put(
        `https://washease.online/api/laundry_shop/users/${user_id}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    mutationKey: [`update-${user_id}`],

    onSuccess: (value) => {
      Toast.show({
        type: "success",
        text1: "Updated successfully",
      });
    },

    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to complete the delivery",
      });
    },
  });

  const handleGetCurrentLocation = async () => {
    if (location) {
      const _address = await getAddress(
        location.coords.latitude,
        location.coords.longitude
      );
      if (_address) {
        form.setValue("address", _address);
      }
    }
  };

  const onSubmit = async () => {
    if (location) {
      const _address = await getAddress(
        location.coords.latitude,
        location.coords.longitude
      );

      if (_address) {
        form.setValue("address", _address);
      }
    }

    mutation.mutate(form.getValues());
    z;
  };

  useEffect(() => {
    if (data) {
      form.setValue("first_name", data?.first_name || "John");
      form.setValue("last_name", data?.last_name || "John");
      form.setValue("email", data?.email || "");
      form.setValue("phone_number", data?.phone_number || "0948288383838");
      form.setValue(
        "address",
        data?.address || "JC2FV+WGV, Muntinlupa, Metro Manila, Philippineso"
      );
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    refetch();
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 ">
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
        <ScrollView>
          <View className="justify-center items-center my-4">
            <IconButton
              icon="account"
              iconColor="#1e1e1e"
              size={150}
              className=" bg-primary/60 w-[180px]  rounded-full h-[180px]"
            />
          </View>

          <View className="justify-between ">
            <View className="px-4">
              <InputField
                controller={form.control}
                name="first_name"
                label={"First Name"}
                placeholder="Enter your first name"
              />
              <InputField
                controller={form.control}
                name="last_name"
                label={"Last Name"}
                placeholder="Enter your last name"
              />
              <View className="flex justify-end">
                <InputField
                  controller={form.control}
                  name={"address"}
                  label={"Address"}
                  placeholder="Enter your Address"
                />
                <View className="justify-end items-end ">
                  <TouchableOpacity onPress={handleGetCurrentLocation}>
                    <IconButton
                      icon="home"
                      className="bg-primary"
                      size={32}
                      iconColor="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <InputField
                controller={form.control}
                label={"Phone number"}
                name={"phone_number"}
                keyboardType={"numeric"}
                placeholder="Enter your Contact"
              />
            </View>
            <View className="px-4 my-4">
              <Button onPress={form.handleSubmit(onSubmit)}>
                <Text className="text-xl text-white text-center font-bold">
                  Update
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RootScreen;
