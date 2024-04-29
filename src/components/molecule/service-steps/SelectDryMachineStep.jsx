import { View } from "react-native";
import WashingMachine from "../../../assets/icons/washing_machine.svg";

import { useController } from "react-hook-form";
import { Text } from "react-native-paper";

import { ToggleButton } from "react-native-paper";
import { cn } from "../../../utils/dev.utils";

const WASHMOCKDATA = [
  {
    id: 0,
    title: "Washing",
    status: "active",
  },
  {
    id: 1,
    title: "Washing",
    status: "inactive",
  },
  {
    id: 2,
    title: "Washing",
    status: "active",
  },
  {
    id: 3,
    title: "Washing",
    status: "active",
  },
  {
    id: 4,
    title: "Washing",
    status: "active",
  },
];

const SelectDryMachineStep = ({ controller, name }) => {
  const { field } = useController({
    control: controller,
    name,
  });

  return (
    <View className="">
      <View className="justify-center items-center mb-12">
        <Text className="text-2xl font-bold mb-2" variant="titleLarge">
          Select Drying Machine
        </Text>
        <View className="bg-secondary px-8 py-2 rounded-full">
          <Text className="text-[18px] font-semibold text-white ">Dry</Text>
        </View>
      </View>

      <ToggleButton.Row
        onValueChange={field?.onChange}
        value={field.value}
        style={{ flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        {WASHMOCKDATA &&
          WASHMOCKDATA.map(({ id, status }) => (
            <View
              key={id}
              className={cn(
                `justify-center ${
                  status === "inactive" ? "opacity-50 " : "opacity-100"
                }`
              )}>
              <ToggleButton
                disabled={status === "inactive" ? true : false}
                value={id}
                icon={WashingMachine}
                style={{ width: 100, height: 100, padding: 8 }}
              />
              <Text className="text-center font-bold" variant="labelLarge">
                Washing {id + 1}
              </Text>
            </View>
          ))}
      </ToggleButton.Row>
    </View>
  );
};

export default SelectDryMachineStep;
