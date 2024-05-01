import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Chip } from "react-native-paper";

import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import FloationActionBtn from "../../../../../components/atoms/FloationActionBtn";
import InputField from "../../../../../components/atoms/InputField";
import { useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import Button from "../../../../../components/atoms/Button";
import { cn } from "../../../../../utils/dev.utils";

const ShopDetails = {
  name: "Shabu Houze",
  address: "Biringan Leyte",
  rating: 5.0,
  about:
    "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  opening: "5 AM - 6 PM",
  status: "Open",
};

const Category = [
  {
    id: 1,
    title: "Overall Experience",
  },

  {
    id: 2,
    title: "Pickup Services",
  },

  {
    id: 3,
    title: "Customer Support",
  },

  {
    id: 4,
    title: "Delivery Services",
  },

  {
    id: 5,
    title: "Transparency",
  },
];

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm({
    defaultValues: { description: "", rating: 0 },
  });

  const handleSelectCategory = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const onSubmit = (value) => {
    const transformedPayload = {
      ...value,
      category: selectedCategories,
    };

    console.log(transformedPayload);
  };

  const handleRating = (value) => {
    setSelectedRating(value);
    form.setValue("rating", value);
  };

  return (
    <View className="flex-1 ">
      <ScrollView>
        <ShopDetailsCover {...ShopDetails} />

        <Text className="px-4 text-[32px] font-bold mt-4">
          Tell us what can be improved?
        </Text>

        <View className="px-4 my-4">
          <Text className="text-lg mb-2 font-bold">Categories</Text>
          <FlatList
            data={Category}
            horizontal
            renderItem={({ item }) => {
              const isSelected = selectedCategories.includes(item.id);
              return (
                <TouchableOpacity
                  onPress={() => handleSelectCategory(item.id)}
                  className={cn(
                    `border border-gray-300 bg-white ${
                      isSelected && "border-2 border-blue-500 bg-blue-300/50"
                    } min-w-[150px] max-w-[200px] px-4 py-2 rounded-full  mr-3`
                  )}>
                  <Text className="text-lg font-md text-center">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View className="px-4">
          <Text>Select Rating</Text>
          <View className=" rounded-[5px] my-4 border border-gray-300">
            <Picker selectedValue={selectedRating} onValueChange={handleRating}>
              <Picker.Item label="Select Rating" value="" />
              <Picker.Item label="One Star" value={1} />
              <Picker.Item label="Two Star" value={2} />
              <Picker.Item label="Three Star" value={3} />
              <Picker.Item label="Four Star" value={4} />
              <Picker.Item label="Five Star" value={5} />
            </Picker>
          </View>
        </View>

        <View className="px-4">
          <Text className="text-lg font-bold mb-1">Description</Text>
          <View className="border border-gray-300 rounded-[5px] p-4">
            <TextInput
              onChangeText={(value) => form.setValue("description", value)}
              multiline={true}
              numberOfLines={10}
              style={{ height: 150, textAlignVertical: "top" }}
            />
          </View>
        </View>

        <View className="px-4">
          <Button onPress={form.handleSubmit(onSubmit)}>
            <Text className="text-center text-lg font-bold text-white">
              Submit
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default RootScreen;
