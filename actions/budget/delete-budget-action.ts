"use server";

import getToken from "@/src/auth/token";
import {
  Budget,
  ErrorResponseSchema,
  PasswordValidateSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { json } from "stream/consumers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteBudget(
  budgetId: Budget["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const currentPassword = PasswordValidateSchema.safeParse(
    formData.get("password")
  );

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`;

  //Validate password
  const checkPasswordRequest = await fetch(checkPasswordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: currentPassword.data,
    }),
  });

  const checkPasswordJson = await checkPasswordRequest.json();
  if (!checkPasswordRequest.ok) {
    const { message } = ErrorResponseSchema.parse(checkPasswordJson);
    return {
      errors: [message],
      success: "",
    };
  }

  //Delete budget
  const deleteByIdUrl = `${process.env.API_URL}/budgets/${budgetId}`;
  const deleteRequest = await fetch(deleteByIdUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const deletedJson = await deleteRequest.json();

  const success = SuccessSchema.parse(json);

  //Revalidate data
  revalidatePath("/admin");

  return {
    errors: [],
    success,
  };
}
