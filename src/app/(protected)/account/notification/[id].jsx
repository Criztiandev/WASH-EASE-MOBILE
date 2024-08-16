import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Icon, Searchbar } from "react-native-paper";

const MOCKDATA = [
  {
    userId: 10,
    id: 1,
    title: "Order Received",
    body: "Your laundry order has been successfully received and is now being processed.",
    date: "2024-01-15",
  },
  {
    userId: 11,
    id: 2,
    title: "Order Processed",
    body: "Your laundry has been cleaned and is ready for pickup.",
    date: "2024-01-16",
  },
  {
    userId: 12,
    id: 3,
    title: "Pickup Reminder",
    body: "This is a friendly reminder to pick up your laundry at your earliest convenience.",
    date: "2024-01-17",
  },
  {
    userId: 13,
    id: 4,
    title: "Order Delivered",
    body: "Your laundry has been delivered to your specified address. Thank you for choosing our service.",
    date: "2024-01-18",
  },
  {
    userId: 14,
    id: 5,
    title: "Order Canceled",
    body: "We regret to inform you that your laundry order has been canceled. Please contact support for further assistance.",
    date: "2024-01-19",
  },
  {
    userId: 15,
    id: 6,
    title: "Payment Received",
    body: "We have received your payment for the laundry service. Thank you for your prompt payment.",
    date: "2024-01-20",
  },
  {
    userId: 16,
    id: 7,
    title: "Order Delayed",
    body: "Due to unforeseen circumstances, your laundry order has been delayed. We apologize for any inconvenience caused.",
    date: "2024-01-21",
  },
  {
    userId: 17,
    id: 8,
    title: "Special Offer",
    body: "Enjoy a 20% discount on your next laundry order. Use code SAVE20 at checkout.",
    date: "2024-01-22",
  },
  {
    userId: 18,
    id: 9,
    title: "Loyalty Points Earned",
    body: "You have earned 50 loyalty points with your recent order. Redeem them on your next visit.",
    date: "2024-01-23",
  },
  {
    userId: 19,
    id: 10,
    title: "Order Completed",
    body: "Your laundry order has been completed. Please collect it at your convenience.",
    date: "2024-01-24",
  },
  {
    userId: 20,
    id: 11,
    title: "Order In Progress",
    body: "Your laundry is currently being cleaned. We will notify you once it is ready for pickup.",
    date: "2024-01-25",
  },
  {
    userId: 21,
    id: 12,
    title: "Payment Reminder",
    body: "Please remember to complete your payment for the laundry service. Thank you.",
    date: "2024-01-26",
  },
  {
    userId: 22,
    id: 13,
    title: "Order Rescheduled",
    body: "Your laundry pickup date has been rescheduled to a later time. Please check your account for details.",
    date: "2024-01-27",
  },
  {
    userId: 23,
    id: 14,
    title: "Order Ready for Pickup",
    body: "Your laundry is ready for pickup. Please visit our shop during business hours.",
    date: "2024-01-28",
  },
  {
    userId: 24,
    id: 15,
    title: "Customer Feedback Request",
    body: "We would love to hear your feedback on our laundry service. Please take a moment to rate us.",
    date: "2024-01-29",
  },
  {
    userId: 25,
    id: 16,
    title: "Order Confirmed",
    body: "Your laundry order has been confirmed. We will notify you once it is ready.",
    date: "2024-01-30",
  },
  {
    userId: 26,
    id: 17,
    title: "Seasonal Discount",
    body: "Enjoy a 15% discount on all laundry services this month. Don't miss out!",
    date: "2024-02-01",
  },
  {
    userId: 27,
    id: 18,
    title: "Order Not Collected",
    body: "Your laundry order has not been collected. Please arrange a pickup as soon as possible.",
    date: "2024-02-02",
  },
  {
    userId: 28,
    id: 19,
    title: "Service Satisfaction Survey",
    body: "We hope you enjoyed our service. Please take a brief survey to help us improve.",
    date: "2024-02-03",
  },
  {
    userId: 29,
    id: 20,
    title: "Laundry Service Expiry",
    body: "Your laundry order will be held for 7 more days before disposal. Please pick it up soon.",
    date: "2024-02-04",
  },
  {
    userId: 30,
    id: 21,
    title: "Order Updated",
    body: "Your laundry order has been updated with additional services. Please review the changes.",
    date: "2024-02-05",
  },
  {
    userId: 31,
    id: 22,
    title: "Thank You for Your Loyalty",
    body: "Thank you for being a loyal customer. Enjoy 100 bonus loyalty points on us!",
    date: "2024-02-06",
  },
  {
    userId: 32,
    id: 23,
    title: "Payment Issue",
    body: "We encountered an issue with your payment. Please contact support to resolve this matter.",
    date: "2024-02-07",
  },
  {
    userId: 33,
    id: 24,
    title: "Order Successfully Completed",
    body: "Your laundry order has been successfully completed. We hope you are satisfied with our service.",
    date: "2024-02-08",
  },
  {
    userId: 34,
    id: 25,
    title: "VIP Membership Invitation",
    body: "You are invited to join our VIP membership for exclusive benefits. Sign up today!",
    date: "2024-02-09",
  },
  {
    userId: 35,
    id: 26,
    title: "Service Outage Notification",
    body: "Our services will be temporarily unavailable due to maintenance. We apologize for the inconvenience.",
    date: "2024-02-10",
  },
  {
    userId: 36,
    id: 27,
    title: "Order Completed with Special Care",
    body: "Your delicate items have been handled with special care and are now ready for pickup.",
    date: "2024-02-11",
  },
  {
    userId: 37,
    id: 28,
    title: "Holiday Service Schedule",
    body: "Please note our modified service schedule for the upcoming holiday. Thank you.",
    date: "2024-02-12",
  },
  {
    userId: 38,
    id: 29,
    title: "Referral Program",
    body: "Refer a friend to our service and both of you will receive a 10% discount on your next order.",
    date: "2024-02-13",
  },
  {
    userId: 39,
    id: 30,
    title: "Order Invoiced",
    body: "Your invoice for the recent laundry order has been generated. Please review it at your convenience.",
    date: "2024-02-14",
  },
];

const RootScreen = () => {
  const [searchedItems, setSearchedItems] = useState(MOCKDATA);

  const handleSearch = (value) => {
    const query = value.toLowerCase();
    const filteredData = MOCKDATA.filter((item) =>
      item.title.toLocaleLowerCase().includes(query)
    );
    setSearchedItems(filteredData);
  };

  return (
    <View className="flex-1 ">
      <View className="flex-1 py-4">
        <Searchbar
          onChangeText={handleSearch}
          className="mb-4 bg-white mx-4"
          placeholder="Search here"
        />
        <FlashList
          data={searchedItems}
          renderItem={({ item }) => (
            <View className="px-4  mb-2">
              <NotificationCard {...item} />
            </View>
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default RootScreen;

const NotificationCard = ({ id, title, body, date }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/shop/choosen/review/${id}`);
      }}
    >
      <View
        className="p-4 border border-gray-300 bg-white space-y-1 rounded-[5px]"
        style={{ flexShrink: 1 }}
      >
        <View className="flex-row space-x-2 mb-2 items-center justify-between">
          <Icon source={"bell"} size={24} />
          <Text className="px-4 py-1 bg-gray-300 rounded-full max-w-[120px] text-center ml-auto font-semibold mb-2">
            {date}
          </Text>
        </View>

        <Text
          className="text-lg font-semibold capitalize"
          style={{ flexShrink: 1 }}
        >
          {title}
        </Text>

        <Text style={{ flexShrink: 1 }}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
};
