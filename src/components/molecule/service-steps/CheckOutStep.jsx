import { View, Text } from "react-native";
import React from "react";
import ScreenLayout from "../../../layout/ScreenLayout";

const CheckOutStep = ({ total, method }) => {
  return (
    <ScreenLayout>
      <View className="flex-1 ">
        <Text className="text-[24px] text-center font-bold my-4">
          CheckoutScreen
        </Text>

        <View className="flex-row space-x-2 justify-center  items-center mb-2">
          <Text className="text-lg font-bold">Transaction Date</Text>
          <Text className="text-base">April 8, 2024</Text>
        </View>

        <View className="flex-row space-x-2 justify-center  items-center">
          <Text className="text-lg font-bold">Estimiated Delivery Date</Text>
          <Text className="text-base">April 9, 2024</Text>
        </View>

        <View className="m-4 border border-gray-300 bg-white p-4 rounded-[5px]">
          <Text className="text-lg font-bold">Personal Info</Text>
          <Text className="text-base font-semibold opacity-50">
            Name: Taylor Swift
          </Text>

          <Text className="text-base font-semibold opacity-50">
            Address: Brgy. Katuparan, Taguig City
          </Text>
          <Text className="text-base font-semibold opacity-50">
            Phone number: 09588667858
          </Text>
        </View>

        <View className="m-4 border border-gray-300 bg-white p-4 rounded-[5px] space-y-2">
          <Text className="text-lg font-bold">Payment Method</Text>
          <View className=" flex-row space-x-2">
            <Text className="opacity-50 text-base font-semibold ">
              Payment Options:
            </Text>
            <View className=" items-center justify-center bg-orange-400  px-3  py-0.5 rounded-full ">
              <Text className="capitalize  font-semibold text-white">
                {method}
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-1 items-center">
            <Text className="text-base font-semibold opacity-50">To Pay:</Text>
            <View className=" items-center justify-center bg-orange-400  px-3  py-0.5 rounded-full ">
              <Text className="capitalize  font-semibold text-white">
                {total}
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-1 items-center">
            <Text className="text-base font-semibold opacity-50">Status:</Text>
            <View className=" items-center justify-center bg-green-400  px-3 py-0.5 rounded-full ">
              <Text className="capitalize  font-semibold text-white">
                Pending
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default CheckOutStep;
