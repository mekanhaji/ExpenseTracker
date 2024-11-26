import { useState } from "react";
import AppLayout from "../../layout";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const DAILY_LIMIT = 120;
const WARNING_LIMIT = 100;
const DANGER_LIMIT = 120;
const CURRENCY = "₹";

const percentage = (current: number, total: number) => {
  if (current > total) return 100;

  return (current / total) * 100;
};

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
        <div
          className={cn("flex flex-col gap-2 p-2 rounded-lg", {
            "bg-red-100": currentExpense >= DANGER_LIMIT,
            "bg-yellow-100":
              currentExpense >= WARNING_LIMIT && currentExpense < DANGER_LIMIT,
            "bg-green-100": currentExpense < WARNING_LIMIT,
          })}
        >
          <Progress
            value={percentage(currentExpense, DAILY_LIMIT)}
            className={cn({
              "[&>div]:bg-red-500": currentExpense >= DANGER_LIMIT,
              "[&>div]:bg-yellow-500":
                currentExpense >= WARNING_LIMIT &&
                currentExpense < DANGER_LIMIT,
              "[&>div]:bg-green-500": currentExpense < WARNING_LIMIT,
            })}
          />

          <h1
            className={cn("text-center text-2xl", {
              "text-red-500": currentExpense >= DANGER_LIMIT,
              "text-yellow-500":
                currentExpense >= WARNING_LIMIT &&
                currentExpense < DANGER_LIMIT,
            })}
          >
            {CURRENCY} {currentExpense} / {DAILY_LIMIT}
          </h1>
        </div>

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
