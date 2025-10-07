import EditBudgetForm from "@/components/budgets/EditBudgetForm";
import { Budget } from "@/src/schemas";
import { getBudgetById } from "@/src/services/budget";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const budget: Budget = await getBudgetById(params.id);
  return {
    title: `CashTrackr - ${budget.name}`,
    description: `CashTrackr - ${budget.name}`,
  };
}

export default async function EditBudgetPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const budget = await getBudgetById(id);
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Edit Budget
          </h1>
          <p className="text-xl font-bold">
            Complete the form to change your {""}
            <span className="text-amber-500">budget</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Back
        </Link>
      </div>
      <div className="p-10 mt-10 shadow-lg border">
        <EditBudgetForm budget={budget} />
      </div>
    </>
  );
}
