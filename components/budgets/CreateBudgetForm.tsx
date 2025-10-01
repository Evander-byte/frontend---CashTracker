"use client";

import { createBudget } from "@/actions/create-budget-action";
import { useFormState } from "react-dom";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateBudgetForm() {
  const router = useRouter();
  const [state, dispatch] = useFormState(createBudget, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/admin");
        },
        onClick: () => {
          router.push("/admin");
        },
      });
    }
  }, [state]);
  return (
    <form className="mt-10 space-y-3" action={dispatch}>
      {state.errors.map((error) => (
        <ErrorMessage>{error}</ErrorMessage>
      ))}
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Budget name
        </label>
        <input
          type="text"
          className="w-full p-3 border-gray-100 bg-slate-100"
          placeholder="Budget name"
          name="name"
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Budget amount
        </label>
        <input
          type="text"
          className="w-full p-3 border-gray-100 bg-slate-100"
          placeholder="Budget amount"
          name="amount"
        />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Create Budget"
      />
    </form>
  );
}
