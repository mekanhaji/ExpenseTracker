import { useState } from "react";
import AppLayout from "../../layout";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useExpenseStore } from "@/store";

const percentage = (current: number, total: number) => {
  if (current > total) return 100;

  return (current / total) * 100;
};

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { currency, expense, dailyLimit, addExpense, warningLimit } =
    useExpenseStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    const expense = parseInt(input.value, 10);
    if (isNaN(expense)) {
      alert("Please enter a valid number");
      return;
    }
    addExpense(expense);
    input.value = "";
    setIsDialogOpen(false);
  };

  return (
    <AppLayout>
      <main className="my-2 flex flex-col items-center gap-4">
        <div
          className={cn("flex flex-col gap-2 p-2 rounded-lg w-full", {
            "bg-red-100": expense >= dailyLimit,
            "bg-yellow-100": expense >= warningLimit && expense < dailyLimit,
            "bg-green-100": expense < warningLimit,
          })}
        >
          <Progress
            value={percentage(expense, dailyLimit)}
            className={cn({
              "[&>div]:bg-red-500": expense >= dailyLimit,
              "[&>div]:bg-yellow-500":
                expense >= warningLimit && expense < dailyLimit,
              "[&>div]:bg-green-500": expense < warningLimit,
            })}
          />

          <h1
            className={cn("text-center text-2xl", {
              "text-red-500": expense >= dailyLimit,
              "text-yellow-500":
                expense >= warningLimit && expense < dailyLimit,
            })}
          >
            {currency} {expense} / {dailyLimit}
          </h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="p-3 rounded-lg bg-blue-500 text-white flex gap-1 items-center w-fit">
            <Plus className="h-4 w-4" />
            <p>Add Expense</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How much did you spend this time?</DialogTitle>
              <DialogDescription>Enter the amount you spent</DialogDescription>
              <form className="flex flex-col items-center" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder={"e.g. 10"}
                  className="p-2 my-2 border border-gray-300 rounded-md max-w-[420px]"
                />
                <button>Add Expense</button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </main>
    </AppLayout>
  );
};

export default Home;
