import { View, Text } from "react-native";
import WashingMachine from "../../../assets/icons/washing_machine.svg";
import { useController } from "react-hook-form";

import { ToggleButton } from "react-native-paper";
import { cn } from "../../../utils/dev.utils";
import useStepManagement from "../../../hooks/useStepManagement";

const SelectWashMachineStep = ({ controller, name, renderItems }) => {
  const { field } = useController({ control: controller, name });
  useStepManagement({ name: name });

  return (
    <View className="">
      {renderItems?.length > 0 ? (
        <Header />
      ) : (
        <View>
          <Text className="text-[24px] font-bold">
            No Available Wash Machine
          </Text>
        </View>
      )}

      <ToggleButton.Row
        onValueChange={field?.onChange}
        value={field.value}
        style={{ flexWrap: "wrap", gap: 16, justifyContent: "center" }}
      >
        {renderItems &&
          renderItems.map(({ machine_name, ...field }) => (
            <MachineToggleButton
              key={field.id}
              {...field}
              machineName={machine_name}
            />
          ))}
      </ToggleButton.Row>
    </View>
  );
};

export default SelectWashMachineStep;

// Heler
const Header = () => (
  <View className="justify-center items-center mb-12">
    <Text className="text-2xl font-bold mb-2" variant="titleLarge">
      Select Washing Machine
    </Text>
    <View className="bg-secondary px-8 py-2 rounded-full">
      <Text className="text-[18px] font-semibold text-white ">Wash</Text>
    </View>
  </View>
);

const MachineToggleButton = ({ id, machineName, status, ...props }) => {
  return (
    <View
      key={id}
      className={cn(
        `justify-center ${
          status !== "Available" ? "opacity-50 " : "opacity-100"
        }`
      )}
    >
      <ToggleButton
        disabled={status !== "Available" ? true : false}
        value={id}
        icon={WashingMachine}
        style={{ width: 100, height: 100, padding: 8 }}
      />
      <Text className="text-center font-bold" variant="labelLarge">
        {status === "Reserve" ? "Reserved" : machineName}
      </Text>
    </View>
  );
};
