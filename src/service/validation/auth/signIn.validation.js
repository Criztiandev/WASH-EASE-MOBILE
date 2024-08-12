import { z } from "zod";

export const signInDefaulValue = {
  email: "user1112@gmail.com",
  password: "11111111",
  // email: "byfoqilica@mailinator.com",
  // password: "awdas123",
  // email: "",
  // password: "",
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
