import { Budget } from "@/src/schemas";
import React from "react";

export default function BudgetForm({ budget }: { budget?: Budget }) {
  return (
    <>
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Budget name
        </label>
        <input
          type="text"
          className="w-full p-3 border-gray-100 bg-slate-100"
          placeholder="Budget name"
          name="name"
          defaultValue={budget?.name}
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
          defaultValue={budget?.amount}
        />
      </div>
    </>
  );
}
