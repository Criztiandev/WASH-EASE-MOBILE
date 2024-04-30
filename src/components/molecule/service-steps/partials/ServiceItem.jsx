import { useCallback, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import InfoIcon from "../../../../assets/icons/info_icon.svg";
import { cn } from "../../../../utils/dev.utils";
import { Modal, Portal } from "react-native-paper";

const ServiceItem = ({
  id: serviceID,
  payload,
  onSelect,
  isActive = false,
}) => {
  const { title, price, description } = payload;
  const [checked, setChecked] = useState(isActive);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const handleChecked = useCallback(() => {
    setChecked((prev) => {
      const newValue = !prev;
      onSelect(newValue, serviceID);
      return newValue;
    });
  }, [onSelect, serviceID]);

  return (
    <>
      <TouchableOpacity
        className={cn(
          `${
            checked && "bg-blue-300/50 border-2 border-blue-400"
          } rounded-[5px] mb-2`
        )}
        onPress={handleChecked}>
        <View className=" max-h-[150px] py-4 px-2 flex-row justify-between ">
          <View className="flex-row space-x-3" style={{ flexShrink: 1 }}>
            <View className="w-[64px] h-[64px] border rounded-[5px]"></View>
            <View style={{ flexShrink: 1 }}>
              <Text className="text-[18px] font-bold">{title}</Text>
              <Text className="text-[18px]">₱ {price}</Text>
            </View>
          </View>

          <TouchableOpacity className="  rounded-full " onPress={toggleModal}>
            <InfoIcon width={36} height={36} className="" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal visible={isModalVisible} onDismiss={toggleModal}>
          <View className=" bg-white h-[300px] mx-4 p-4 rounded-[5px] space-y-4">
            <Text
              className="text-center font-bold text-[32px]"
              style={{ flexShrink: 1 }}>
              Description
            </Text>
            <Text className="text-[16px]" style={{ flexShrink: 1 }}>
              {description}
            </Text>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default ServiceItem;
