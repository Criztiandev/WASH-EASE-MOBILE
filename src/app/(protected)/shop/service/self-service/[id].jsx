import React from "react";
import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import axios from "axios";
import Toast from "react-native-toast-message";

import Button from "../../../../../components/atoms/Button";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";
import useMultiform from "../../../../../hooks/useMultiform";
import { stepAtom } from "../../../../../service/states/service.atoms";
import { useAuthContext } from "../../../../../context/AuthContext";

// Steps
import SelectWashMachineStep from "../../../../../components/molecule/service-steps/SelectWashMachineStep";
import SelectDryMachineStep from "../../../../../components/molecule/service-steps/SelectDryMachineStep";
import SelectServiceStep from "../../../../../components/molecule/service-steps/SelectServiceStep";
import SelectMaterialStep from "../../../../../components/molecule/service-steps/SelectMaterialStep";
import PaymentStep from "../../../../../components/molecule/service-steps/PaymentStep";
import CheckOutStep from "../../../../../components/molecule/service-steps/CheckOutStep";

const SelfServiceScreen = () => {
  const { authState } = useAuthContext();
  const router = useRouter();
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
      "transaction-method": "self_service",
      total: 0,
    },
  });

  const {
    data: laundryData,
    isError: isLaundryError,
    isLoading: isLaundryLoading,
  } = useFetchLaundryData(id);
  const {
    data: userData,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useFetchUserData(authState?.user_id);

  const { step, nextStep, prevStep, isFinalStep, isFirstStep } = useMultiform([
    <SelectWashMachineStep
      controller={form.control}
      name="wash"
      renderItems={laundryData?.wash}
    />,
    <SelectDryMachineStep
      controller={form.control}
      name="dry"
      renderItems={laundryData?.dry}
    />,
    <SelectServiceStep
      form={form}
      name="basic-service"
      initialData={form.getValues("basic-service")}
      renderItems={laundryData?.["basic-service"]}
    />,
    <SelectMaterialStep
      form={form}
      name="basic-material"
      initialData={form.getValues("basic-material")}
      renderItems={laundryData?.["basic-material"]}
    />,
    <PaymentStep shopID={id} form={form} name="method" />,
    <CheckOutStep
      total={form.getValues("total")}
      method={form.getValues("payment-method")}
    />,
  ]);

  const serviceMutation = useMutation({
    mutationFn: async (value) => {
      const response = await axios.post(
        "https://washease.online/api/laundry_shop/transactions",
        value,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Order Placed",
        text2: "Thank you for using Wash Ease",
      });
      router.push("/customer/choosen-shop");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again later",
      });
      console.error(error);
    },
  });

  const onSubmit = async (value) => {
    const currentValue = form.getValues(currentStep);

    if (isServiceValid(currentValue, currentStep)) {
      Toast.show({
        type: "error",
        text1: "Please fill all the fields to proceed",
      });
      return;
    }

    if (!isFinalStep) {
      nextStep();
      return;
    }

    try {
      const finalPayload = await transformedFinalPayloadPromise(
        id,
        value,
        userData
      );

      serviceMutation.mutate(finalPayload);
      console.log(JSON.stringify(finalPayload, null, 2));
    } catch (error) {
      console.error("Error preparing final payload:", error);
      Toast.show({
        type: "error",
        text1: "Error preparing order",
        text2: "Please try again",
      });
    }
  };

  if (isLaundryLoading || isUserLoading) return <LoadingScreen />;
  if (isLaundryError || isUserError) return <ErrorScreen />;

  return (
    <View className="flex-1 bg-[#FAF8FF] mb-2">
      <View className="flex-1 justify-center items-center">{step}</View>
      <View className="px-4 space-y-2">
        <Button onPress={form.handleSubmit(onSubmit)}>
          <Text className="text-center font-semibold text-xl text-white">
            {isFinalStep ? "Proceed" : "Next"}
          </Text>
        </Button>
        {!isFirstStep && (
          <Button variant="outline" onPress={prevStep}>
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
      const { washing_machine, data, selling_items } = response.data;

      const washMachine = washing_machine.filter((item) =>
        ["Washing Machine", "Washing"].includes(item.machine_type)
      );
      const dryMachine = washing_machine.filter((item) =>
        ["Drying", "Drying Machine"].includes(item.machine_type)
      );
      const basicService = data.filter(
        (item) =>
          item.service_category.service_category_name === "Basic Services"
      );

      return {
        "basic-service": basicService,
        "basic-material": selling_items,
        wash: washMachine,
        dry: dryMachine,
      };
    },
  });
};

const useFetchUserData = (id) => {
  return useQuery({
    queryKey: [`user-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `https://washease.online/api/get-customer-details/${id}`
      );
      const { first_name, last_name, email, phone_number, role } =
        response.data;
      return {
        id,
        firstName: first_name,
        lastName: last_name,
        email,
        phoneNumber: phone_number,
        role,
      };
    },
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
  if (!id) return;

  return [
    {
      service: id,
      service_name: serviceName,
      service_price: servicePrice,
      quantity: 1,
    },
  ];
};

const isServiceValid = (value, step) =>
  value === "" ||
  value === null ||
  (Array.isArray(value) && value.length === 0 && step === "basic-service");

const transformedFinalPayload = (id, value, credentials) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const transformedWashMachine = value.wash
    ? transformService(value.wash, "Washing Machine", "N/A")
    : [];

  const transformedDryMachine = value.dry
    ? transformService(value.dry, "Drying Machine", "N/A")
    : [];

  const transformedBasicMaterial = transformItems(value["basic-material"]);
  const transformedBasicService = transformItems(
    value["basic-service"],
    "title"
  );

  const serviceAvail = [
    ...transformedBasicMaterial,
    ...transformedBasicService,
    ...transformedWashMachine,
    ...transformedDryMachine,
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
    delivery_fee: 0,
    delivery_date: currentDate,
    payment_method: value["payment-method"] || "CASH",
    total_bill: value.total,
    status: "PENDING",
  };
};

const transformedFinalPayloadPromise = (id, value, credentials) =>
  new Promise((resolve, reject) => {
    try {
      const payload = transformedFinalPayload(id, value, credentials);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
