"use server";

import getToken from "@/src/auth/token";
import {
  Budget,
  DraftExpenseSchema,
  ErrorResponseSchema,
  Expense,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

type BudgetAndExpenseType = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

export default async function editExpense(
  { budgetId, expenseId }: BudgetAndExpenseType,
  praveState: ActionStateType,
  formData: FormData
) {
  const expense = DraftExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!expense.success) {
    return {
      errors: expense.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
    }),
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
