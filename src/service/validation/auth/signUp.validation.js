import z from "zod";

export const signUpDefaulValue = {
  avatar: "",
  first_name: "",
  last_name: "",
  address: "",
  phone_number: "",
  email: "",
  password: "",
};

export const PersonalInfoValidation = z.object({
  first_name: z
    .string()
    .min(2, "First name is too short")
    .max(24, "First name is too long"),
  last_name: z
    .string()
    .min(2, "Last name is too short")
    .max(24, "Last name is too long"),
});

export const OtherInfoValidation = z.object({
  address: z
    .string()
    .min(2, "Adress is too short")
    .max(24, "Adress is too long"),
  phone_number: z
    .string()
    .min(2, "Contact is too short")
    .max(12, "Contact is too long"),
});

export const AccountInfoValidation = z.object({
  avatar: z.string(),
  email: z
    .string()
    .email()
    .min(2, "Email is too short")
    .max(24, "Email is too long"),
  password: z
    .string()
    .min(2, "Password is too short")
    .max(16, "Password is too long"),
});
