import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Button from "../../atoms/Button";
import CloseIcon from "../../../assets/icons/close_icon.svg";
import ShopServiceDetailCard from "../../molecule/ShopServiceDetailCard";
import { Icon, IconButton } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

const MOCKDATA = [
  {
    id: "123123213213333",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Self Service",
    price: 300,
    description:
      "Efficient, clean, and user-friendly, our self-service laundry lets you handle your washing with high-efficiency machines",
  },
  {
    id: "2323232",
    cover:
      "https://images.pexels.com/photos/21525439/pexels-photo-21525439/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Full Service",
    price: 300,
    description:
      "Drop off your laundry and leave the rest to us! Our full-service option includes washing, drying, and folding. ",
  },
];

const ShopServiceOfferTab = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [selected, setIsSelected] = useState("");

  const toggleModal = (id) => {
    setIsToggle((prev) => !prev);
    setIsSelected(id);
  };

  return (
    <>
      <View className="flex-1">
        <FlashList
          data={MOCKDATA}
          renderItem={({ item }) => (
            <ShopServiceDetailCard {...item} onToggle={toggleModal} />
          )}
          estimatedItemSize={200}
          keyExtractor={(items) => items.id}
          className="mx-4"
        />
      </View>

      <Modal animationType="slide" visible={isToggle} className="">
        <View className="flex-row justify-between p-4 items-center">
          <Text className="text-2xl font-semibold">Description</Text>
          <IconButton icon={"close"} onPress={() => setIsToggle(false)} />
        </View>

        <View className="px-4 space-y-4">
          <Text className="text-base">
            Experience the ultimate in convenience and care with our Full
            Service Laundry package. We handle everything from sorting to
            folding, ensuring each garment receives the attention it deserves.
            Our services include professional washing, drying, and precision
            ironing, using eco-friendly detergents and advanced cleaning
            technologies.
          </Text>
          <View className="flex-row items-center space-x-2">
            <Icon source={"clock"} size={24} />
            <Text className="text-base">30 Minutes</Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <Icon source={"weight-kilogram"} size={24} />
            <Text className="text-base">Max 7Kgs</Text>
          </View>
        </View>

        <View className="absolute bottom-0 w-full  px-4">
          <Button className={"w-full"}>Choose</Button>
        </View>
      </Modal>
    </>
  );
};

export default ShopServiceOfferTab;
