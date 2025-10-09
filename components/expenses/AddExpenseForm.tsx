import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useFormState } from "react-dom";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createExpense } from "@/actions/expense/create-expense-action";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const router = useRouter();
  const { id } = useParams();
  const createExpenseWithId = createExpense.bind(null, +id);
  const [state, dispatch] = useFormState(createExpenseWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state]);
  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Add your expense
      </DialogTitle>

      <p className="text-xl font-bold">
        Complete the form and create an {""}
        <span className="text-amber-500">expense</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        {state.errors.map((error) => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
        <ExpenseForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Record expense"
        />
      </form>
    </>
  );
}
