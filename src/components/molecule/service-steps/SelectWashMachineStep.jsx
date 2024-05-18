import { View } from "react-native";
import WashingMachine from "../../../assets/icons/washing_machine.svg";
import { useController } from "react-hook-form";
import { Text } from "react-native-paper";

import { ToggleButton } from "react-native-paper";
import { cn } from "../../../utils/dev.utils";
import { useAuthContext } from "../../../context/AuthContext";
import useFetchMachine from "../../../hooks/useFetchMachine";
import LoadingScreen from "../../atoms/LoadingScreen";
import ErrorScreen from "../../atoms/ErrorScreen";
import useStepManagement from "../../../hooks/useStepManagement";

const SelectWashMachineStep = ({ controller, name }) => {
  const { authState } = useAuthContext();
  const { field } = useController({ control: controller, name });
  const { data, isLoading, isError } = useFetchMachine({
    name: "select-wash-machine",
    token: authState?.token,
  });
  useStepManagement({ name: name });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  const WashingMachineData = data.filter(
    (machine) => machine["machine_type"] === "Washing"
  );

  return (
    <View className="">
      <Header />

      <ToggleButton.Row
        onValueChange={field?.onChange}
        value={field.value}
        style={{ flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        {WashingMachineData &&
          WashingMachineData.map(({ machine_name, ...field }) => (
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

const MachineToggleButton = ({ id, machineName, status }) => {
  return (
    <View
      key={id}
      className={cn(
        `justify-center ${
          status !== "Available" ? "opacity-50 " : "opacity-100"
        }`
      )}>
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
