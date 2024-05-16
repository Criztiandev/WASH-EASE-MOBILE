import { View } from "react-native";
import WashingMachine from "../../../assets/icons/washing_machine.svg";
import { useController } from "react-hook-form";
import { Text } from "react-native-paper";

import { ToggleButton } from "react-native-paper";
import { cn } from "../../../utils/dev.utils";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { stepAtom } from "../../../service/states/service.atoms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";

const WASHMOCKDATA = [
  {
    id: 0,
    machine_name: "Washing-1",
    status: "Available",
  },
  {
    id: 1,
    machine_name: "Washing-2",
    status: "inAvailable",
  },
  {
    id: 2,
    machine_name: "Washing-3",
    status: "Available",
  },
  {
    id: 3,
    machine_name: "Washing-4",
    status: "Available",
  },
  {
    id: 4,
    machine_name: "Washing-5",
    status: "Available",
  },
];

const SelectWashMachineStep = ({ controller, name }) => {
  const { authState } = useAuthContext();

  const setCurrentStep = useSetAtom(stepAtom);
  const { field } = useController({
    control: controller,
    name,
  });

  const payload = useQuery({
    queryFn: async () => {
      const { token } = authState;
      return await axios.get(
        "https://washease.iamjohn.cloud/public/api/laundry-shop/machines",
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    queryKey: ["selected-wash-machine"],
  });

  useEffect(() => {
    setCurrentStep(name);

    return () => {
      setCurrentStep("");
    };
  }, []);

  if (payload.isLoading) {
    return (
      <View>
        <Text className="text-xl font-bold">Loading...</Text>
      </View>
    );
  }

  if (payload.isError) {
    return (
      <View>
        <Text className="text-xl">Internet connection problem...</Text>
      </View>
    );
  }

  const { data } = payload.data.data;
  const WashingMachineData = data.filter(
    (machine) => machine["machine_type"] === "Washing"
  );

  return (
    <View className="">
      <View className="justify-center items-center mb-12">
        <Text className="text-2xl font-bold mb-2" variant="titleLarge">
          Select Washing Machine
        </Text>
        <View className="bg-secondary px-8 py-2 rounded-full">
          <Text className="text-[18px] font-semibold text-white ">Wash</Text>
        </View>
      </View>

      <ToggleButton.Row
        onValueChange={field?.onChange}
        value={field.value}
        style={{ flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        {WASHMOCKDATA &&
          WASHMOCKDATA.map(({ id, status, machine_name }) => (
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
                {status === "Reserve" ? "Reserved" : machine_name}
              </Text>
            </View>
          ))}
      </ToggleButton.Row>
    </View>
  );
};

export default SelectWashMachineStep;
