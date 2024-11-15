import { useState } from "react";
import AppLayout from "../../layout";

const DAILY_LIMIT = 120;
const CURRENCY = "₹";

const Home = () => {
  const [currentExpense, setCurrentExpense] = useState<number>(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    const expense = parseInt(input.value, 10);
    if (isNaN(expense)) {
      alert("Please enter a valid number");
      return;
    }
    setCurrentExpense(currentExpense + expense);
    input.value = "";
  };

  return (
    <AppLayout>
      <main className="my-2">
        <h1 className="text-center text-4xl">
          You have spent {CURRENCY} {currentExpense} today out of {CURRENCY}{" "}
          {DAILY_LIMIT}
        </h1>

        <form className="flex flex-col items-center" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={"e.g. 10"}
            className="p-2 my-2 border border-gray-300 rounded-md max-w-[420px]"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md max-w-[200px]">
            Add Expense
          </button>
        </form>
      </main>
    </AppLayout>
  );
};

export default Home;
