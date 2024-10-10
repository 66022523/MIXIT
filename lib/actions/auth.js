"use server";
import { revalidatePath } from "next/cache";
import { isAuthApiError, isAuthWeakPasswordError } from "@supabase/supabase-js";

import {
  SignInFormSchema,
  SignUpFormSchema,
  ForgotFormSchema,
  RecoveryFormSchema,
} from "@/lib/definitions/auth";

import { createClient } from "@/utils/supabase/server";

export const signInAction = async (formData) => {
  const supabase = createClient();

  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { email, password } = validatedFields.data;

  if (!email)
    return {
      type: "warning",
      message: "Please enter your email.",
    };
  if (!password) {
    return {
      type: "warning",
      message: "Please enter your password.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);

    if (isAuthApiError(error))
      return {
        type: "warning",
        message: error.message,
      };

    switch (error.code) {
      case "email_not_confirmed":
        return {
          type: "warning",
          message:
            "This email address has not been verified. Please check your email.",
        };
      case "user_banned":
        return {
          type: "warning",
          message:
            "This user has been banned. Please contact support if you think this is an error.",
        };
      case "user_not_found":
        return {
          type: "warning",
          message:
            "The user was not found. Please sign up for an account first.",
        };
      default:
        return {
          type: "danger",
          message: "An unknown error occurred. Please try again.",
        };
    }
  }

  formData.set("email", "");
  formData.set("password", "");

  return {
    type: "success",
    message: "",
  };
};

export const signUpAction = async (formData) => {
  const supabase = createClient();

  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    legal: formData.get("legal"),
  });

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { email, password, confirmPassword, legal } = validatedFields.data;

  if (!email)
    return {
      type: "warning",
      message: "Please enter your email.",
    };
  if (!password)
    return {
      type: "warning",
      message: "Please enter your password.",
    };
  if (!confirmPassword)
    return {
      type: "warning",
      message: "Please confirm your password.",
    };
  if (password !== confirmPassword)
    return {
      type: "warning",
      message: "The password does not match, please enter it again.",
    };
  if (!legal)
    return {
      type: "warning",
      message: "You must read and acknowledge the app's policies.",
    };

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${email.substring(0, 5)}`,
      },
    },
  });

  if (error) {
    console.error(error);

    if (isAuthWeakPasswordError(error))
      return {
        type: "warning",
        message:
          "Passwords must be at least 8 - 30 characters long, consisting of lowercase letters, uppercase letters, numbers, and symbols.",
      };
    if (isAuthApiError(error)) {
      if (error.status === 429)
        return {
          type: "danger",
          message: "Too many requests. Please wait a bit.",
        };
      return {
        type: "danger",
        message: error.message,
      };
    }
    switch (error.code) {
      case "email_exists":
        return {
          type: "info",
          message: "This email address is already in the system.",
        };
      case "email_provider_disabled":
        return {
          type: "warning",
          message:
            "Currently, it is temporarily impossible to apply for a new account.",
        };
      case "over_email_send_rate_limit":
        return {
          type: "warning",
          message:
            "Send too many verification emails to such accounts, please try again later.",
        };
      case "over_request_rate_limit":
        return {
          type: "warning",
          message:
            "There are too many requests to send confirmation emails, please try again later.",
        };
      case "email_not_confirmed":
        return {
          type: "warning",
          message:
            "This email address has not been verified. Please check your email.",
        };
      case "user_already_exists":
        return {
          type: "info",
          message: "There are already such users in the system.",
        };
      case "user_banned":
        return {
          type: "warning",
          message:
            "This user has been banned. Please contact support if you think this is an error.",
        };
      default:
        return {
          type: "danger",
          message: "An unknown error occurred. Please try again.",
        };
    }
  }

  formData.set("email", "");
  formData.set("password", "");
  formData.set("confirmPassword", "");
  formData.set("legal", false);

  return {
    type: "success",
    message: "",
    email_service: `https://${email.split("@").pop()}`,
  };
};

export const forgotAction = async (formData) => {
  const supabase = createClient();

  const validatedFields = ForgotFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { email } = validatedFields.data;

  if (!email)
    return {
      type: "warning",
      message: "Please enter your email.",
    };

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error);

    if (isAuthApiError(error)) {
      if (error.status === 429)
        return {
          type: "danger",
          message: "Too many requests. Please wait a bit.",
        };
      return {
        type: "danger",
        message: error.message,
      };
    }
    return {
      type: "danger",
      message: "An unknown error occurred. Please try again.",
    };
  }

  formData.set("email", "");

  return {
    type: "info",
    message: "A password reset email has been sent to the email. ",
    loading: false,
  };
};

export const recoveryAction = async (formData) => {
  const supabase = createClient();

  const validatedFields = RecoveryFormSchema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { newPassword, confirmPassword } = validatedFields.data;

  if (!newPassword)
    return {
      type: "warning",
      message: "Please enter your new password.",
    };
  if (!confirmPassword)
    return {
      type: "warning",
      message: "Please confirm your new password.",
    };
  if (newPassword !== confirmPassword)
    return {
      type: "warning",
      message: "The password does not match, please enter it again.",
    };

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error(error);
    return {
      type: "danger",
      message: error.message,
    };
  }
  if (data)
    return {
      type: "success",
      message: "Your password has been updated.",
    };
};

export const signOutAction = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();
  revalidatePath("/");
};
