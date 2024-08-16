import { View, Text } from "react-native";
import React from "react";
import ScreenLayout from "../../../layout/ScreenLayout";
import { useAuthContext } from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../atoms/LoadingScreen";
import ErrorScreen from "../../atoms/ErrorScreen";

const CheckOutStep = ({ total, method }) => {
  const currentDate = new Date();
  const nextDate = new Date();
  nextDate.setDate(currentDate.getDate() + 1);

  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedCurrentDate = currentDate.toLocaleDateString("en-US", options);
  const formattedNextDate = nextDate.toLocaleDateString("en-US", options);
  const { authState } = useAuthContext();

  const { data, isLoading, isError } = useFetchUserData(authState?.user_id);

  if (isLoading) return <LoadingScreen />;
  return (
    <ScreenLayout>
      <View className="flex-1 ">
        <Text className="text-[24px] text-center font-bold my-4">
          CheckoutScreen
        </Text>

        <View className="flex-row space-x-2 justify-center  items-center mb-2">
          <Text className="text-lg font-bold">Transaction Date</Text>
          <Text className="text-base">{formattedCurrentDate}</Text>
        </View>

        <View className="flex-row space-x-2 justify-center  items-center">
          <Text className="text-lg font-bold">Estimated Delivery Date</Text>
          <Text className="text-base">{formattedNextDate}</Text>
        </View>

        <View className="m-4 border border-gray-300 bg-white p-4 rounded-[5px]">
          <Text className="text-lg font-bold">Personal Info</Text>
          <Text className="text-base font-semibold opacity-50">
            Name: {data.firstName} {data.lastName}
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
            <View className=" items-center justify-center bg-blue-400  px-3 py-0.5 rounded-full ">
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

const useFetchUserData = (id) => {
  return useQuery({
    queryFn: async () => {
      const result = await axios.get(`
      https://washease.online/api/get-customer-details/${id}`);

      const { first_name, last_name, email, phone_number, role } = result.data;

      return {
        id: id,
        firstName: first_name,
        lastName: last_name,
        email,
        phoneNumer: phone_number,
        role,
      };
    },
    queryKey: [`user-${id}`],
  });
};
