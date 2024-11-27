import { useMemo, useState } from "react";
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
import { Clock12Icon, Plus } from "lucide-react";
import { useExpenseStore } from "@/store";

const percentage = (current: number, total: number) => {
  if (current > total) return 100;

  return (current / total) * 100;
};

const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    currency,
    expense,
    dailyLimit,
    expenseRecords,
    warningLimit,

    addExpense,
  } = useExpenseStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const amount = form.querySelector("input[name=amount]") as HTMLInputElement;
    const discretion = form.querySelector(
      "input[name=discretion]"
    ) as HTMLInputElement;

    const expense = parseInt(amount.value, 10);
    if (isNaN(expense)) {
      alert("Please enter a valid number");
      return;
    }
    addExpense(expense, discretion.value);
    amount.value = "";
    discretion.value = "";
    setIsDialogOpen(false);
  };

  const expenseRecordsMemoized = useMemo(() => {
    const today = new Date().toLocaleDateString("en-IN");
    return expenseRecords
      .filter(
        (record) =>
          new Date(record.datetime).toLocaleDateString("en-IN") === today
      )
      .reverse();
  }, [expenseRecords]);

  return (
    <AppLayout>
      <main className="my-2 flex flex-col items-center gap-4">
        <div
          className={cn("flex flex-col gap-2 p-2 rounded-lg w-full", {
            "bg-app-error-100": expense >= dailyLimit,
            "bg-app-warning-100":
              expense >= warningLimit && expense < dailyLimit,
            "bg-app-100": expense < warningLimit,
          })}
        >
          <Progress
            value={percentage(expense, dailyLimit)}
            className={cn({
              "[&>div]:bg-app-error-500": expense >= dailyLimit,
              "[&>div]:bg-app-warning-500":
                expense >= warningLimit && expense < dailyLimit,
              "[&>div]:bg-app-500": expense < warningLimit,
            })}
          />

          <h1
            className={cn("text-center text-2xl", {
              "text-app-error-500": expense >= dailyLimit,
              "text-app-warning-500":
                expense >= warningLimit && expense < dailyLimit,
            })}
          >
            {currency} {expense} / {dailyLimit}
          </h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="p-3 rounded-lg bg-app-500 text-white flex gap-1 items-center w-fit">
            <Plus className="h-4 w-4" />
            <p>Add Expense</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How much did you spend this time?</DialogTitle>
              <DialogDescription>
                Enter the details of your spending
              </DialogDescription>
              <form className="flex flex-col items-center" onSubmit={onSubmit}>
                <div className="flex flex-col w-full">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    placeholder={"e.g. 10"}
                    className="p-2 my-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="discretion">Description</label>
                  <input
                    type="text"
                    name="discretion"
                    placeholder={"e.g. Lunch"}
                    className="p-2 my-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button className="p-2 mt-4 rounded-lg bg-app-500 text-white w-full text-center">
                  Record Expense
                </button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {expenseRecordsMemoized.map((record) => (
          <div className="bg-app-100 p-2 w-full rounded-lg flex justify-between items-center">
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl">{record.discretion}</h2>
              <span className="flex items-center gap-2 uppercase">
                <Clock12Icon className="h-4 w-4" />{" "}
                {formatDateTime(record.datetime)}
              </span>
            </div>
            <h1 className="text-4xl">
              {currency} {record.amount}
            </h1>
          </div>
        ))}
      </main>
    </AppLayout>
  );
};

export default Home;