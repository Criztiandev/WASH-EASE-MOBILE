import { View, Text, TouchableOpacity } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { cn } from "../../../../utils/dev.utils";
import { Badge, IconButton } from "react-native-paper";

const MaterialItem = memo(
  ({
    id: materialID,
    payload,
    onSelect,
    isActive = false,
    initialQuantity = 0,
  }) => {
    const [checked, setChecked] = useState(isActive);
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 99));
    const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 0));

    const handleSelect = useCallback(() => {
      setChecked((prev) => !prev);
    }, []);

    useEffect(() => {
      if (checked) {
        onSelect((prev) => {
          const exist = prev?.find(({ id: itemID }) => itemID === materialID);

          // if checked and doesnt exist, create instance
          if (!exist) {
            setQuantity((prev) => prev + 1);
            return [...prev, { ...payload, quantity: 1 }];
          }

          // if checked and exist, find the item and update its quantity
          return prev.map((item) =>
            item.id === materialID ? { ...item, quantity } : item
          );
        });
      } else {
        setQuantity(0);
        onSelect((prev) =>
          prev.filter(({ id: itemID }) => itemID !== materialID)
        );
      }
    }, [checked, quantity]);

    // Check validation

    return (
      <TouchableOpacity
        className={cn(
          `${
            checked && "bg-blue-300/50 border-2 border-blue-400"
          } rounded-[5px] mb-2`
        )}
        onPress={handleSelect}>
        <View className=" max-h-[150px] py-4 px-2 flex-row ">
          <View className="justify-between flex-row  flex-1">
            {/* Details */}
            <View
              className="flex-row space-x-3 justify-between items-center"
              style={{ flexShrink: 1 }}>
              {quantity > 0 && (
                <View className="">
                  <Badge
                    className={"text-[14px] w-[24px] h-[24px] rounded-full "}>
                    {quantity}
                  </Badge>
                </View>
              )}
              <View className="w-[64px] h-[64px] border rounded-[5px]"></View>
              <View>
                <Text className="text-[18px] font-bold">Regular Wash</Text>
                <Text className="text-[18px]">950</Text>
              </View>
            </View>

            {/* Actions */}
            {checked && (
              <View className="flex-row">
                <IconButton
                  icon="plus"
                  size={24}
                  onPress={handleIncrement}
                  className=" bg-gray-400/50"
                />

                <IconButton
                  icon="minus"
                  size={24}
                  onPress={handleDecrement}
                  className=" bg-gray-400/50"
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

export default MaterialItem;
