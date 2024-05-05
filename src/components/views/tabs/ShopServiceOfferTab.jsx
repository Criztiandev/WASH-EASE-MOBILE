import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import Button from "../../atoms/Button";
import CloseIcon from "../../../assets/icons/close_icon.svg";
import ShopServiceDetailCard from "../../molecule/ShopServiceDetailCard";
import { Icon, IconButton } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

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

const ShopServiceOfferTab = ({ id, onPress, status }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const toggleModal = (id) => {
    const credentials = MOCKDATA.find((items) => items.id === id) || [];
    setIsToggle((prev) => !prev);
    setSelectedService(credentials);
  };

  const handleSelect = () => {
    const currentTitle = selectedService?.title.replace(" ", "-");
    if (!currentTitle) return;

    setIsToggle(false);
    router.push(`/shop/service/${currentTitle.toLowerCase()}`);
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
          <Text className="text-2xl font-semibold">
            {selectedService?.title}
          </Text>
          <IconButton icon={"close"} onPress={() => setIsToggle(false)} />
        </View>

        <View className="px-4 space-y-4">
          <Text className="text-base">{selectedService?.description}</Text>
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
          <Button className={"w-full"} onPress={handleSelect}>
            {status ? "Select Service" : "Choose Shop"}
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default ShopServiceOfferTab;
