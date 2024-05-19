import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import useMultiform from "./useMultiform";
import SelectWashMachineStep from "../components/molecule/service-steps/SelectWashMachineStep";
import SelectDryMachineStep from "../components/molecule/service-steps/SelectDryMachineStep";
import SelectServiceStep from "../components/molecule/service-steps/SelectServiceStep";
import SelectMaterialStep from "../components/molecule/service-steps/SelectMaterialStep";
import PaymentStep from "../components/molecule/service-steps/PaymentStep";
import CheckOutStep from "../components/molecule/service-steps/CheckOutStep";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch initial data (example, replace with your own logic)
const fetchInitialData = async ({ id }) => {
  const response = await axios.post(
    "https://washease.online/api/get-basic-services-by-laundry-shops",
    { laundry_shop_id: 2 }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useSelfServiceForm = ({ id }) => {
  const form = useForm({
    defaultValues: {
      "basic-service": [],
      "basic-material": [],
      dry: "",
      wash: "",
      "payment-method": "cash",
      "delivery-method": "self-service",
      total: 0,
    },
  });

  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const payload = await fetchInitialData(id);

      console.log(payload);
      return [];
    },
    queryKey: [`laundry-${id}`],
  });

  const steps = [
    { component: SelectWashMachineStep, name: "wash" },
    { component: SelectDryMachineStep, name: "dry" },
    { component: SelectServiceStep, name: "basic-service" },
    { component: SelectMaterialStep, name: "basic-material" },
    { component: PaymentStep, name: "method" },
    { component: CheckOutStep, name: "checkout" },
  ];

  const {
    step,
    nextStep,
    prevStep,
    isFinalStep,
    currentStepIndex,
    isFirstStep,
  } = useMultiform(
    steps.map(({ component: StepComponent, name }) => (
      <StepComponent
        key={name}
        controller={form.control}
        name={name}
        form={form}
        initialData={data ? data[name] : null} // Pass initial data to each step
      />
    ))
  );

  const onSubmit = (values) => {
    if (
      !values["basic-service"] ||
      (values["basic-service"].length <= 0 && currentStepIndex === 2)
    ) {
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

    Toast.show({
      type: "success",
      text1: "Order Placed",
      text2: "Thank you for using wash ease",
    });
    router.replace("/customer/(tabs)/home");
  };

  return {
    form,
    step,
    onSubmit,
    isFirstStep,
    isFinalStep,
    prevStep,
    data,
    error,
    isLoading,
  };
};

export default useSelfServiceForm;
