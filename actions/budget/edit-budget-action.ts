"use server";

import getToken from "@/src/auth/token";
import { Budget, EditBudgetSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function editBudget(
  budgetId: Budget["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const budget = EditBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  });

  const json = await req.json();
  const success = SuccessSchema.parse(json);

  //Revalidate the url after a mutation
  revalidatePath("/admin");

  //Revalidate only especific queries with the tag
  // revalidateTag("/all-budgets");

  return {
    errors: [],
    success,
  };
}
