import { View } from "react-native";
import WashingMachine from "../../assets/icons/washing_machine.svg";
import { useController } from "react-hook-form";
import { Text } from "react-native-paper";

import { ToggleButton } from "react-native-paper";
import { cn } from "../../utils/dev.utils";

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

const DryMachineSelection = ({ controller, name }) => {
  const { field } = useController({
    control: controller,
    name,
  });

  return (
    <View className="mt-[64px]">
      <View className="justify-center items-center mb-12">
        <Text className="text-[24px] font-bold mb-2" variant="titleLarge">
          Select Washing Machine
        </Text>
        <Text className="text-[18px] font-semibold  px-8 py-1 rounded-full bg-blue-200">
          Dry
        </Text>
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

export default DryMachineSelection;
