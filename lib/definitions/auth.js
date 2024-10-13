import { z } from "zod";

import config from "@/config";

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(config.validation.min_password, {
      message: `Be at least ${config.validation.min_password} characters long`,
    })
    .regex(/[a-z]/, { message: "Contain at least one lower case letter." })
    .regex(/[A-Z]/, { message: "Contain at least one upper case letter." })
    .regex(/\d/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  confirmPassword: z.string().trim(),
  legal: z.boolean({ message: "Accept is required" }).default(false),
});

export const ForgotFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const RecoveryFormSchema = z.object({
  newPassword: z
    .string()
    .min(config.validation.min_password, {
      message: `Be at least ${config.validation.min_password} characters long`,
    })
    .regex(/[a-z]/, { message: "Contain at least one lower case letter." })
    .regex(/[A-Z]/, { message: "Contain at least one upper case letter." })
    .regex(/\d/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  confirmPassword: z.string().trim(),
});
