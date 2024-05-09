import { z } from "zod";

export const signInDefaulValue = {
  email: "",
  password: "",
};

export const SignInValidationSchema = z.object({
  email: z
    .string()
    .email()
    .min(3, "Email is too short")
    .max(120, "Email is too long"),
  password: z
    .string()
    .min(2, "Password is too short")
    .max(16, "Password is too long"),
});
