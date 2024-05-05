import { View, Text } from "react-native";
import React, { useState } from "react";
import TaskDetailsCard from "../../../../../components/organism/TaskDetailsCard";
import ShopDetailsCover from "../../../../../components/organism/ShopDetailsCover";
import { IconButton, Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Picker } from "@react-native-picker/picker";

const MOCKDATA = [
  {
    id: 0,
    fullName: "Maria Cruz Delos Reyes",
    address: "1234 Calle Vista, Biringan City",
    phoneNumber: "123-456-7890",
    status: "Active",
  },
  {
    id: 1,
    fullName: "Juan Pablo Miras",
    address: "4321 Via Monte, Nuevo City",
    phoneNumber: "234-567-8901",
    status: "Inactive",
  },
  {
    id: 2,
    fullName: "Lucy Chen",
    address: "987 South Lane, Springfield",
    phoneNumber: "345-678-9012",
    status: "Pending",
  },
  {
    id: 3,
    fullName: "Amir Basra",
    address: "654 North Avenue, Riverton",
    phoneNumber: "456-789-0123",
    status: "Active",
  },
  {
    id: 4,
    fullName: "Sara Al-Amri",
    address: "321 Western Road, Eastwood",
    phoneNumber: "567-890-1234",
    status: "Active",
  },
  {
    id: 5,
    fullName: "Clara Smithson",
    address: "213 Eastern Road, Kings Landing",
    phoneNumber: "678-901-2345",
    status: "Inactive",
  },
  {
    id: 6,
    fullName: "Dmitri Yang",
    address: "789 Pine Street, Blackwood",
    phoneNumber: "789-012-3456",
    status: "Pending",
  },
  {
    id: 7,
    fullName: "Olivia Dunham",
    address: "357 Maple Avenue, Star City",
    phoneNumber: "890-123-4567",
    status: "Active",
  },
  {
    id: 8,
    fullName: "Ethan Tremblay",
    address: "246 Oak Street, Silverton",
    phoneNumber: "901-234-5678",
    status: "Active",
  },
  {
    id: 9,
    fullName: "Mia Tang",
    address: "135 Cherry Lane, Smalltown",
    phoneNumber: "012-345-6789",
    status: "Inactive",
  },
  {
    id: 10,
    fullName: "Noah Clarke",
    address: "864 Cedar Blvd, Highland",
    phoneNumber: "123-456-7890",
    status: "Active",
  },
  {
    id: 11,
    fullName: "Sophia Loren",
    address: "975 Birch Street, Coventry",
    phoneNumber: "234-567-8901",
    status: "Pending",
  },
  {
    id: 12,
    fullName: "Liam Neeson",
    address: "546 Elm Street, Brookdale",
    phoneNumber: "345-678-9012",
    status: "Active",
  },
  {
    id: 13,
    fullName: "Emma Goldman",
    address: "235 Pine Knoll, Shady Oaks",
    phoneNumber: "456-789-0123",
    status: "Inactive",
  },
  {
    id: 14,
    fullName: "Ava Fielding",
    address: "321 Ash Lane, Evergreen",
    phoneNumber: "567-890-1234",
    status: "Active",
  },
  {
    id: 15,
    fullName: "Mason Ray",
    address: "678 Redwood Circle, Pinecrest",
    phoneNumber: "678-901-2345",
    status: "Pending",
  },
  {
    id: 16,
    fullName: "Isabella Knight",
    address: "159 Dogwood Ave, Lakeside",
    phoneNumber: "789-012-3456",
    status: "Active",
  },
  {
    id: 17,
    fullName: "Jacob Elordi",
    address: "832 Maple Road, Westfield",
    phoneNumber: "890-123-4567",
    status: "Inactive",
  },
  {
    id: 18,
    fullName: "Madison Hu",
    address: "467 Oak Lane, River Run",
    phoneNumber: "901-234-5678",
    status: "Active",
  },
  {
    id: 19,
    fullName: "Elijah Wood",
    address: "298 Birch Park, Greenview",
    phoneNumber: "012-345-6789",
    status: "Pending",
  },
  {
    id: 20,
    fullName: "Charlotte Hope",
    address: "123 Spruce Street, Southbank",
    phoneNumber: "123-456-7890",
    status: "Active",
  },
  {
    id: 21,
    fullName: "Logan Paul",
    address: "456 Vine Street, Hilltop",
    phoneNumber: "234-567-8901",
    status: "Inactive",
  },
  {
    id: 22,
    fullName: "Avery Thorne",
    address: "789 Grove Ave, Riverside",
    phoneNumber: "345-678-9012",
    status: "Active",
  },
  {
    id: 23,
    fullName: "James Potter",
    address: "321 Ridge Road, Easton",
    phoneNumber: "456-789-0123",
    status: "Pending",
  },
  {
    id: 24,
    fullName: "Grace Lee",
    address: "213 High St, Northgate",
    phoneNumber: "567-890-1234",
    status: "Active",
  },
];

const RootScreen = () => {
  const [filter, setFilter] = useState("");
  return (
    <View className=" flex-1 space-y-4">
      <View className="px-4 space-y-4">
        <Searchbar className="bg-white mt-4" placeholder="Search" />
        <View className=" rounded-[5px]  border border-gray-300 bg-white">
          <Picker
            selectedValue={filter}
            onValueChange={(value) => setFilter(value)}>
            <Picker.Item label="Filter" value="" />
            <Picker.Item label="Ready" value="pick-up" />
            <Picker.Item label="On Delivery" value="on-delivery" />
            <Picker.Item label="Delivered" value="delivered" />
            <Picker.Item label="Cancelled" value="canceled" />
          </Picker>
        </View>
      </View>

      <View className="flex-1">
        <FlashList
          data={MOCKDATA}
          renderItem={({ item }) => <TaskDetailsCard {...item} />}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default RootScreen;
