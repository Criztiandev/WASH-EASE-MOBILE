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

const useSelfServiceForm = ({ selected, payloadData }) => {
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

  const steps = [
    { component: SelectWashMachineStep, name: "wash" },
    { component: SelectDryMachineStep, name: "dry" },
    { component: SelectServiceStep, name: "basic-service" },
    { component: SelectMaterialStep, name: "basic-material" },
    { component: PaymentStep, name: "total" },
    { component: CheckOutStep, name: "total" },
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
        initialData={form.getValues(name)} // Pass initial data to each step
        renderItems={payloadData && payloadData[name]} // Pass initial data to each step
      />
    ))
  );

  const onSubmit = (values) => {
    // if (
    //   !values["basic-service"] ||
    //   (values["basic-service"].length <= 0 && currentStepIndex === 2)
    // ) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Please fill all the fields to proceed",
    //   });
    //   return;
    // }

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
  };
};

export default useSelfServiceForm;
