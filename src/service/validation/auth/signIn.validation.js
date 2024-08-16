import { z } from "zod";

export const signInDefaulValue = {
  // email: "rosy@gmail.com",
  // password: "password",
  // email: "julius@gmail.com",
  // password: "password",
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
