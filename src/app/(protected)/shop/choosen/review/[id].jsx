import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Toast from "react-native-toast-message";

import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import Button from "../../../../../components/atoms/Button";
import { cn } from "../../../../../utils/dev.utils";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import { useAuthContext } from "../../../../../context/AuthContext";

const Category = [
  { id: 1, title: "Overall Experience" },
  { id: 2, title: "Pickup Services" },
  { id: 3, title: "Customer Support" },
  { id: 4, title: "Delivery Services" },
  { id: 5, title: "Transparency" },
];

const RootScreen = () => {
  const { authState } = useAuthContext();
  const { id: shopID } = useLocalSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);

  console.log(shopID);

  const mutation = useMutation({
    mutationKey: [`mutate-${shopID}`],
    mutationFn: async (value) =>
      await axios.post(
        "https://washease.online/api/laundry-shop/laundry-shop-ratings",
        value,
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      ),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Thank you for your feedback",
      });
      reset();
      setSelectedCategories([]);
    },

    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error?.message,
      });

      console.log(JSON.stringify(error?.response?.data?.message, null, 2));
    },
  });

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: { description: "", rating: "" },
  });

  const handleSelectCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const onSubmit = (formData) => {
    const payload = {
      customer_id: authState?.user_id,
      laundry_shop_id: shopID,
      services_id: "",
      rating_count: getValues()?.rating,
      rating_comment: getValues()?.description,
    };

    console.log(payload);
    mutation.mutate(payload);
  };

  return (
    <ScrollView>
      <View className="py-4">
        <Text className="px-4 text-[32px] font-bold mt-4">
          Tell us what can be improved?
        </Text>

        <View className="px-2 my-4">
          <Text className="text-lg mb-2 font-bold">Categories</Text>
          <FlatList
            data={Category}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedCategories.includes(item.id);
              return (
                <TouchableOpacity
                  onPress={() => handleSelectCategory(item.id)}
                  className={cn(
                    `border border-gray-300 bg-white ${
                      isSelected && "border-2 border-blue-500 bg-blue-300/50"
                    } min-w-[150px] max-w-[200px] px-4 py-2 rounded-full mr-3`
                  )}
                >
                  <Text className="text-lg font-md text-center">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View className="px-4">
          <Text>Select Rating</Text>
          <View className="rounded-[5px] my-4 border border-gray-300">
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value } }) => (
                <Picker selectedValue={value} onValueChange={onChange}>
                  <Picker.Item label="Select Rating" value="" />
                  <Picker.Item label="One Star" value="1" />
                  <Picker.Item label="Two Stars" value="2" />
                  <Picker.Item label="Three Stars" value="3" />
                  <Picker.Item label="Four Stars" value="4" />
                  <Picker.Item label="Five Stars" value="5" />
                </Picker>
              )}
            />
          </View>
        </View>

        <View className="px-4">
          <Text className="text-lg font-bold mb-1">Description</Text>
          <View className="border border-gray-300 rounded-[5px] p-4">
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={10}
                  style={{ height: 150, textAlignVertical: "top" }}
                />
              )}
            />
          </View>
        </View>

        <View className="px-4 mt-4 mb-8">
          <Button onPress={handleSubmit(onSubmit)}>
            <Text className="text-center text-lg font-bold text-white">
              Submit
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default RootScreen;
