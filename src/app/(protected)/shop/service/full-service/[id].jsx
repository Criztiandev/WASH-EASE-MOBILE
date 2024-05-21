import { View, Text } from "react-native";
import Button from "../../../../../components/atoms/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../../../../../components/atoms/LoadingScreen";
import ErrorScreen from "../../../../../components/atoms/ErrorScreen";

import { useForm } from "react-hook-form";

import { useLocalSearchParams } from "expo-router";
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
import { useAtomValue } from "jotai";
import { stepAtom } from "../../../../../service/states/service.atoms";
import TransactionModeStep from "../../../../../components/molecule/service-steps/TransactionModeStep";
import { useAuthContext } from "../../../../../context/AuthContext";

const FullServiceScreen = () => {
  const { authState } = useAuthContext();
  const currentStep = useAtomValue(stepAtom);
  const { id } = useLocalSearchParams();

  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-cleaning": [],
      "basic-ironing": [],
      "basic-material": [],
      "payment-method": "cash",
      "delivery-method": "standard",
      "transaction-method": "",
      total: 0,
    },
  });

  const { data, isError, isLoading } = useFetchLaundryData(id);
  const userPayload = useFetchUserData(authState?.user_id);

  const { step, nextStep, prevStep, isFinalStep, isFirstStep } = useMultiform([
    <TransactionModeStep
      form={form}
      name={"transaction-method"}
      initialData={form.getValues("transaction-method")}
      renderItems={[
        { id: 0, title: "Pick only" },
        { id: 1, title: "Pick up and Delivery" },
      ]}
    />,

    <SelectServiceStep
      form={form}
      name={"basic-service"}
      initialData={form.getValues("basic-service")}
      renderItems={data?.["basic-service"]}
    />,

    <SelectDryCleaningStep
      form={form}
      name={"basic-cleaning"}
      initialData={form.getValues("basic-cleaning")}
      renderItems={data?.["basic-cleaning"]}
    />,

    <SelectIroningStep
      form={form}
      name={"basic-ironing"}
      initialData={form.getValues("basic-ironing")}
      renderItems={data?.["basic-ironing"]}
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

  const onSubmit = (value) => {
    const currentValue = form.getValues(currentStep);

    if (
      isServiceValid(currentValue, currentStep, [
        "basic-service",
        "transaction-method",
      ])
    ) {
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

    const finalPayload = transformedFinalPayload(id, value, userPayload);
    console.log(finalPayload);

    Toast.show({
      type: "success",
      text1: "Order Placed",
      text2: "Thank you for using wash ease",
    });
    // router.replace("../../customer/(tabs)/home");
  };

  if (isLoading || userPayload.isLoading) return <LoadingScreen />;
  if (isError || userPayload.isError) return <ErrorScreen />;

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

export default FullServiceScreen;

const useFetchLaundryData = (id) => {
  return useQuery({
    queryKey: [`laundry-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `https://washease.online/api/get-basic-services-by-laundry-shops-id/${id}`
      );
      const basePayload = response.data;

      const basicService = basePayload["data"].filter(
        (item) =>
          item.service_category.service_category_name === "Basic Services"
      );
      const basicIroning = basePayload["data"].filter(
        (item) => item.service_category.service_category_name === "Ironing"
      );
      const basicDryCleaning = basePayload["data"].filter(
        (item) => item.service_category.service_category_name === "Dry Cleaning"
      );

      const transformedPayload = {
        "basic-service": basicService,
        "basic-material": basePayload["selling_items"],
        "basic-cleaning": basicDryCleaning,
        "basic-ironing": basicIroning,
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

const isServiceValid = (value, step, flagedStep) => {
  return (
    value === "" ||
    value === null ||
    (Array.isArray(value) && value.length <= 0 && flagedStep.includes(step))
  );
};

const transformedFinalPayload = (id, value, credentials) => {
  //transform the data into this format

  const transformedBasicIroning = transformItems(value["basic-ironing"]);
  const transformedBasicCleaning = transformItems(value["basic-cleaning"]);
  const transformedBasicMaterial = transformItems(value["basic-material"]);
  const transformedBasicService = transformItems(
    value["basic-service"],
    "title"
  );

  const serviceAvail = [
    ...transformedBasicMaterial,
    ...transformedBasicService,
    ...transformedBasicIroning,
    ...transformedBasicCleaning,
  ];

  return {
    customer_id: credentials.id,
    laundry_shop_id: id,
    customer_name: `${credentials.firstName} ${credentials.lastName}`,
    customer_address: "N/A",
    customer_type: credentials.role,
    delivery_fee: value["delivery-method"] === "rush" ? 200 : 0,
    service_avail: serviceAvail,
    service_type: value["transaction-method"],
    payment_status: value["payment_method"] || "CASH",
    total_bill: value["total"],
    status: "PENDING",
  };
};
