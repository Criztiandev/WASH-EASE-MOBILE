import z from "zod";

export const registrationDefault = {
  profile: "",
  firstName: "",
  lastName: "",
  address: "",
  contact: "",
  email: "",
  password: "",
};

export const PersonalInfoValidation = z.object({
  firstName: z
    .string()
    .min(2, "First name is too short")
    .max(24, "First name is too long"),
  lastName: z
    .string()
    .min(2, "Last name is too short")
    .max(24, "Last name is too long"),
});

export const OtherInfoValidation = z.object({
  address: z
    .string()
    .min(2, "Adress is too short")
    .max(24, "Adress is too long"),
  contact: z
    .string()
    .min(2, "Contact is too short")
    .max(12, "Contact is too long"),
});

export const AccountInfoValidation = z.object({
  profile: z.string(),

  email: z
    .string()
    .email()
    .min(2, "Email is too short")
    .max(24, "Email is too long"),
  password: z
    .string()
    .min(2, "Password is too short")
    .max(8, "Password is too long"),
});
