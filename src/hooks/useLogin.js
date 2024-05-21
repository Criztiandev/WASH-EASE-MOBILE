import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  SignInValidationSchema,
  signInDefaulValue,
} from "../service/validation/auth/signIn.validation";

const useLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signInDefaulValue,
    resolver: zodResolver(SignInValidationSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (value) => await authApi.login(value),
    onSuccess: async ({ data }) => {
      const { message } = data;

      Toast.show({ type: "success", text1: message });
    },
    onError: (error) => {
      console.log(error);
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const onSubmitForm = handleSubmit((value) => {
    loginMutation.mutate(value);
  });

  return { ...loginMutation, control, errors, onSubmitForm };
};

export default useLoginForm;
