import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Icon } from "react-native-paper";
import Badge from "../atoms/Badge";
import { useQuery } from "@tanstack/react-query";
import laundryApi from "../../api/laundry.api";
import LoadingScreen from "../atoms/LoadingScreen";
import ErrorScreen from "../atoms/ErrorScreen";
import { useRouter } from "expo-router";

const LaundryShopDetails = ({ id }) => {
  const router = useRouter();
  const { isLoading, isError, error, data } = useQuery({
    queryFn: async () => await laundryApi.fetchAllLaundryShopByID(id),
    queryKey: [`home-laundry-${id}`],
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    return <ErrorScreen message={error.message} />;
  }

  return (
    <TouchableOpacity
      className="flex-1"
      onPress={() => router.push(`/shop/details/${data.id}`)}
    >
      <View className=" flex-1  m-4 relative max-w-sm bg-white border border-gray-300 rounded-lg shadow">
        <Image
          source={
            "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          contentFit="cover"
          transition={1000}
          className="h-[110px] rounded-t-md flex-1"
        />
        <View className="p-5 space-y-4">
          <Text className="font-bold capitalize text-3xl">
            {data.laundry_shop_name || "Shop name"}
          </Text>

          <View className="opacity-50 space-y-2 ">
            <View className="flex-row items-center ">
              <View className="mr-2">
                <Icon source={"information"} size={24} color="black" />
              </View>
              <Text className="text-[16px] capitalize">
                {data?.laundry_shop_address || data?.address || "Unavailable"}
              </Text>
            </View>

            <View className="flex-row items-center ">
              <View className="mr-2">
                <Icon source={"phone"} size={24} color="black" />
              </View>
              <Text className="text-[16px]">
                {data?.phone_number || "Unavailable"}
              </Text>
            </View>
          </View>

          {/* {label && <Button onPress={onNavigate}>{label}</Button>} */}
        </View>

        <Badge>
          <Text className="text-md font-semibold text-green-900 capitalize">
            Status
          </Text>
        </Badge>
      </View>
    </TouchableOpacity>
  );
};

export default LaundryShopDetails;
