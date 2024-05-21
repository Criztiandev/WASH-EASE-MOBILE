import { View, Text } from "react-native";
import Button from "../../../../../components/atoms/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";

import { useForm } from "react-hook-form";

import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

// Components
import useMultiform from "../../../../../hooks/useMultiform";

// Steps
import SelectMaterialStep from "../../../../../components/molecule/service-steps/SelectMaterialStep";
import SelectDryCleaningStep from "../../../../../components/molecule/service-steps/SelectDryCleaningStep";
import SelectIroningStep from "../../../../../components/molecule/service-steps/SelectIroningStep";
import PaymentStep from "../../../../../components/molecule/service-steps/PaymentStep";
import CheckOutStep from "../../../../../components/molecule/service-steps/CheckOutStep";
import SelectServiceStep from "../../../../../components/molecule/service-steps/SelectServiceStep";
import SelectWashMachineStep from "../../../../../components/molecule/service-steps/SelectWashMachineStep";
import SelectDryMachineStep from "../../../../../components/molecule/service-steps/SelectDryMachineStep";
import { useAtomValue } from "jotai";
import { stepAtom } from "../../../../../service/states/service.atoms";
import { useAuthContext } from "../../../../../context/AuthContext";

const SelfServiceScreen = () => {
  const { authState } = useAuthContext();
  const currentStep = useAtomValue(stepAtom);
  const { id } = useLocalSearchParams();

  const form = useForm({
    defaultValues: {
      wash: 0,
      dry: 0,
      "basic-service": [],
      "basic-material": [],
      "payment-method": "cash",
      "delivery-method": "standard",
      "transaction-method": "self_serivce",
      total: 0,
    },
  });

  const { data, isError, isLoading } = useFetchLaundryData(id);
  const userPayload = useFetchUserData(authState?.user_id);

  const { step, nextStep, prevStep, isFinalStep, isFirstStep } = useMultiform([
    <SelectWashMachineStep
      controller={form.control}
      name={"wash"}
      renderItems={data?.wash}
    />,

    <SelectDryMachineStep
      controller={form.control}
      name={"dry"}
      renderItems={data?.dry}
    />,
    <SelectServiceStep
      form={form}
      name={"basic-service"}
      initialData={form.getValues("basic-service")}
      renderItems={data?.["basic-service"]}
    />,

    <SelectMaterialStep
      form={form}
      name="basic-material"
      initialData={form.getValues("basic-material")}
      renderItems={data?.["basic-material"]}
    />,
    <PaymentStep form={form} name="method" />,
    <CheckOutStep
      total={form.getValues("total")}
      method={form.getValues("payment-method")}
    />,
  ]);

  const serviceMutation = useMutation({
    mutationFn: async (value) => {
      console.log(value);

      const authToken = authState.token; // Replace with your actual auth token
      const result = await axios.post(
        "https://washease.online/api/laundry_shop/transactions",
        value,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json", // Ensure Content-Type is set if needed
          },
        }
      );
      return result.data;
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Order Placed",
        text2: "Thank you for using wash ease",
      });
      router.replace("/customer/home");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Thank you for your patience",
      });
      console.log(error);
    },
  });

  const onSubmit = (value) => {
    const currentValue = form.getValues(currentStep);

    if (isServiceValid(currentValue, currentStep, ["basic-service"])) {
      Toast.show({
        type: "error",
        text1: "Please Fill all the field to proceed",
      });
      return;
    }

    if (!isFinalStep) {
      nextStep();
      return;
    }

    const finalPayload = transformedFinalPayload(id, value, userPayload.data);
    serviceMutation.mutate(finalPayload);
  };

  if (isLoading || userPayload.isLoading) return <LoadingScreen />;
  if (isError || userPayload.isError) return <ErrorScreen />;

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <View className="flex-1 bg-[#FAF8FF] mb-2">
      <View className=" flex-1 justify-center items-center">{step}</View>

      <View className="px-4  space-y-2">
        <Button onPress={form.handleSubmit(onSubmit)}>
          <Text className="text-center font-semibold text-xl text-white ">
            {isFinalStep ? "Proceed" : "Next"}
          </Text>
        </Button>

        {!isFirstStep && (
          <Button variant={"outline"} onPress={() => prevStep()}>
            <Text className="text-center font-semibold text-xl text-black">
              Back
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default SelfServiceScreen;

const useFetchLaundryData = (id) => {
  return useQuery({
    queryKey: [`laundry-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `https://washease.online/api/get-basic-services-by-laundry-shops-id/${id}`
      );
      const basePayload = response.data;

      const washMachine = basePayload["washing_machine"].filter(
        (item) => item["machine_type"] === "Washing Machine"
      );
      const dryMachine = basePayload["washing_machine"].filter(
        (item) => item["machine_type"] === "Drying"
      );

      const basicService = basePayload["data"].filter(
        (item) =>
          item.service_category.service_category_name === "Basic Services"
      );

      const transformedPayload = {
        "basic-service": basicService,
        "basic-material": basePayload["selling_items"],
        wash: washMachine,
        dry: dryMachine,
      };

      return transformedPayload;
    },
  });
};

const useFetchUserData = (id) => {
  return useQuery({
    queryFn: async () => {
      const result = await axios.get(`
      https://washease.online/api/get-customer-details/${id}`);

      const { first_name, last_name, email, phone_number, role } = result.data;

      return {
        id: id,
        firstName: first_name,
        lastName: last_name,
        email,
        phoneNumer: phone_number,
        role,
      };
    },
    queryKey: [`user-${id}`],
  });
};

const transformItems = (items, itemNameKey = "item_name") =>
  items.map((item) => ({
    service: item.id,
    service_name: item[itemNameKey],
    service_price: item.price,
    quantity: item.quantity || 0,
  }));

const transformService = (id, serviceName, servicePrice) => {
  return [
    {
      service: id,
      service_name: serviceName,
      service_price: servicePrice,
      quantity: 1,
    },
  ];
};

const isServiceValid = (value, step) => {
  return (
    value === "" ||
    value === null ||
    (Array.isArray(value) && value.length <= 0 && step === "basic-service")
  );
};

const transformedFinalPayload = (id, value, credentials) => {
  const date = new Date();
  const currentDate = date.toISOString().split("T")[0];

  const transformedWashMachine = transformService(
    value["wash"],
    "Washing Machine",
    "N/A"
  );
  const transformeDryMachine = transformService(
    value["dry"],
    "Washing Machine",
    "N/A"
  );
  const transformedBasicMaterial = transformItems(value["basic-material"]);

  const transformedBasicService = transformItems(
    value["basic-service"],
    "title"
  );

  const serviceAvail = [
    ...transformedBasicMaterial,
    ...transformedBasicService,
    ...transformedWashMachine,
    ...transformeDryMachine,
  ];

  return {
    customer_id: credentials.id,
    machine_id: 2,
    laundry_shop_id: Number(id),
    customer_name: `${credentials.firstName} ${credentials.lastName}`,
    customer_address: "N/A",
    customer_type: credentials.role,
    service_avail: serviceAvail,
    service_type: value["transaction-method"],
    payment_method: value["payment_method"] || "CASH",
    total_bill: value["total"],
    delivery_date: currentDate,
    delivery_fee: 0,
    status: "PENDING",
  };
};
