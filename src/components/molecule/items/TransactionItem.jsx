import { TouchableOpacity, View, Text, Modal } from "react-native";
import { cn } from "../../../utils/dev.utils";

const TransactionItem = ({ payload, isActive, onSelect }) => {
  const { title } = payload;
  return (
    <>
      <TouchableOpacity
        className={cn(
          `${
            isActive && "bg-blue-300/50  border-blue-400"
          } rounded-[5px] mt-4 mx-4 border border-gray-400 px-2 `
        )}
        onPress={() => onSelect(title)}>
        <View className=" max-h-[150px] py-4 px-2 flex-row justify-between ">
          <View className="flex-row space-x-3" style={{ flexShrink: 1 }}>
            <View style={{ flexShrink: 1 }}>
              <Text className="text-[18px] font-bold mb-1">{title}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default TransactionItem;
