"use server";

import getToken from "@/src/auth/token";
import {
  Budget,
  ErrorResponseSchema,
  Expense,
  SuccessSchema,
} from "@/src/schemas";
import { json } from "stream/consumers";
import { success } from "zod/v4";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

type BudgetAndExpenseType = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

export default async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpenseType,
  prevState: ActionStateType
) {
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    const { message } = ErrorResponseSchema.parse(json);
    return {
      errors: [message],
      success: "",
    };
  }

  revalidatePath(`admin/budgets/${budgetId}`);

  const success = SuccessSchema.parse(json);
  return {
    errors: [],
    success,
  };
}
