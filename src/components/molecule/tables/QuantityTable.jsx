import { View, Text } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

const QuantityTable = ({ title, payload = [] }) => {
  return (
    <DataTable className="min-h-[64px]">
      <DataTable.Header>
        <DataTable.Title>
          <Text className="font-bold text-base text-black">{title}</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text className="font-bold text-base text-black">Quantity</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text className="font-bold text-base text-black">Price</Text>
        </DataTable.Title>
      </DataTable.Header>

      <View className="min-h-[64px]">
        {payload?.length <= 0 ? (
          <View className="p-4 flex-1 items-center justify-center">
            <Text>No Available {title}</Text>
          </View>
        ) : (
          <FlashList
            data={payload}
            renderItem={({ item }) => (
              <DataTable.Row style={{ justifyContent: "flex-start" }}>
                <DataTable.Cell className="justify-start">
                  <Text className="text-black">{item["item_name"]}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text className="text-black">{item?.quantity}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text className="text-black">₱ {item?.price}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            )}
            estimatedItemSize={200}
          />
        )}
      </View>
    </DataTable>
  );
};

export default QuantityTable;
