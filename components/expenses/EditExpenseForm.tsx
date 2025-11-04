import { DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DraftExpene } from "@/src/schemas";
import { useFormState } from "react-dom";
import editExpense from "@/actions/expense/edit-expense-action";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [expense, setExpense] = useState<DraftExpene>();
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();

  const expenseId = searchParams.get("editExpenseId")!;
  const editExpenseWithId = editExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  });
  const [state, dispatch] = useFormState(editExpenseWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExpense(data));
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state]);
  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Edit Expense
      </DialogTitle>
      <p className="text-xl font-bold">
        Edit the details of your {""}
        <span className="text-amber-500">expense</span>
      </p>
      {state.errors.map((error) => (
        <ErrorMessage>{error}</ErrorMessage>
      ))}
      <form
        noValidate
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        action={dispatch}
      >
        <ExpenseForm expense={expense} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Save changes"
        />
      </form>
    </>
  );
}
