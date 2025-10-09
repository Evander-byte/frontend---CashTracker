export default function ExpenseForm() {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Expense name
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100  bg-white"
          type="text"
          placeholder="Expense name"
          name="name"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Expense amount
        </label>
        <input
          id="amount"
          className="w-full p-3  border border-gray-100 bg-white"
          type="number"
          placeholder="Expense amount"
          name="amount"
        />
      </div>
    </>
  );
}
