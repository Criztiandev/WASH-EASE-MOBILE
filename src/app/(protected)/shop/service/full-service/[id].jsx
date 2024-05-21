import { View, Text } from "react-native";
import Button from "../../../../../components/atoms/Button";
import { useQuery } from "@tanstack/react-query";
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

const FullServiceScreen = () => {
  const currentStep = useAtomValue(stepAtom);
  const { id } = useLocalSearchParams();

  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-cleaning": [],
      "basic-ironing": [],
      "basic-material": [],
      "payment-method": "",
      "delivery-method": "",
      total: 0,
    },
  });

  const { data, isError, isLoading } = useQuery({
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
      const basicIroning = basePayload["data"].filter(
        (item) => item.service_category.service_category_name === "Ironing"
      );
      const basicDryCleaning = basePayload["data"].filter(
        (item) => item.service_category.service_category_name === "Dry Cleaning"
      );

      const transformedPayload = {
        "basic-service": basicService,
        "basic-material": basePayload["selling_items"],
        "basic-dryCleaning": basicDryCleaning,
        "basic-ironing": basicIroning,
        wash: washMachine,
        dry: dryMachine,
      };

      return transformedPayload;
    },
  });

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

  const onSubmit = (value) => {
    console.log(currentStep);
    const isHasValue = form.getValues("basic-service");

    if (
      isHasValue === "" ||
      isHasValue === null ||
      (isHasValue?.length <= 0 && currentStep === "basic-service")
    ) {
      Toast.show({
        type: "error",
        text1: "Please Fill all the field to proceed",
      });
      return;
    }

    if (!isFinalStep) {
      console.log(value);

      nextStep();
      return;
    }

    //transform the data into this format
    console.log(value);

    const transformedBasicMaterial = value["basic-material"].map((item) => ({
      service: item.id,
      service_name: item.item_name,
      service_price: item.price,
      quantity: item.quantity || 0,
    }));

    const transformedBasicService = value["basic-service"].map((item) => ({
      service: item.id,
      service_name: item.title,
      service_price: item.price,
      quantity: 1,
    }));

    const transformedWash = [
      {
        service: value["wash"],
        service_name: "Washing Machine",
        service_price: "N/A",
        quantity: 1,
      },
    ];

    const transformedDry = [
      {
        service: value["dry"],
        service_name: "Drying Machine",
        service_price: "N/A",
        quantity: 1,
      },
    ];

    const serviceAvail = [
      ...transformedBasicMaterial,
      ...transformedBasicService,
      ...transformedWash,
      ...transformedDry,
    ];

    const finalPayload = {
      customer_id: 0,
      laundry_shop_id: id,
      customer_name: "",
      customer_address: "",
      customer_type: "",
      delivery_fee: value["delivery-method"] === "rush" ? 500 : 0,
      service_avail: serviceAvail,
      payment_status: value["payment_method"] || "Cash",
      status: "PENDING",
      total_bill: value["total"],
    };

    console.log(finalPayload);

    Toast.show({
      type: "success",
      text1: "Order Placed",
      text2: "Thank you for using wash ease",
    });
    // router.replace("../../customer/(tabs)/home");
  };

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

export default FullServiceScreen;
