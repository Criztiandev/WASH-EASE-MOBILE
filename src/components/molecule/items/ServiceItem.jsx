import { useCallback, useState } from "react";
import { TouchableOpacity, View, Text, Modal } from "react-native";
import { Icon, IconButton, Portal } from "react-native-paper";
import InfoIcon from "../../../assets/icons/info_icon.svg";
import { cn } from "../../../utils/dev.utils";
import Button from "../../atoms/Button";

const ServiceItem = ({
  id: serviceID,
  payload,
  onSelect,
  isActive = false,
}) => {
  const { service_name: title, price, description } = payload;
  const [checked, setChecked] = useState(isActive);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const handleChecked = useCallback(() => {
    setChecked((prev) => {
      const newValue = !prev;
      onSelect(newValue, {
        id: payload.id,
        title: payload.service_name,
        price: payload.price,
      });
      return newValue;
    });

    setIsModalVisible(false);
  }, [onSelect, serviceID]);

  return (
    <>
      <TouchableOpacity
        className={cn(
          `${
            checked
              ? "bg-blue-300/50 border-2 border-blue-400"
              : "border border-gray-400/50 bg-[#737373]/5  "
          } rounded-[5px] mt-4 mx-4 `
        )}
        onPress={handleChecked}
      >
        <View className=" max-h-[150px] py-4 px-2 flex-row justify-between ">
          <View className="flex-row space-x-3" style={{ flexShrink: 1 }}>
            <View style={{ flexShrink: 1 }}>
              <Text className="text-[18px] font-bold mb-1">{title}</Text>
              <Text className="text-[18px]">₱ {price}</Text>
            </View>
          </View>

          <TouchableOpacity className="  rounded-full " onPress={toggleModal}>
            <InfoIcon width={36} height={36} className="" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Portal>
        <Modal animationType="slide" visible={isModalVisible} className="">
          <View className="flex-row justify-between p-4 items-center">
            <Text className="text-2xl font-semibold">{title}</Text>
            <IconButton
              icon={"close"}
              onPress={() => setIsModalVisible(false)}
            />
          </View>

          <View className="px-4 space-y-4">
            <Text className="text-base">{description}</Text>
          </View>

          <View className="absolute bottom-0 w-full  px-4 mb-4">
            <Button className={"w-full"} onPress={handleChecked}>
              Select
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default ServiceItem;
