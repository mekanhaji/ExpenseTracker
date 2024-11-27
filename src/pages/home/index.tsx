import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useExpenseStore } from "@/store";
import { Clock12Icon, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import AppLayout from "../../layout";
import CreateUpdateExpenseModal from "./components/CreateUpdateExpenseModal";

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
  const [updateId, setUpdateId] = useState<string | null>(null);

  const {
    currency,
    currentExpense: expense,
    dailyLimit,
    expenseRecords,
    warningLimit,

    removeExpense,
    setCurrentExpense,
  } = useExpenseStore();

  const expenseRecordsMemoized = useMemo(() => {
    const today = new Date().toLocaleDateString("en-IN");
    expenseRecords
      .filter(
        (record) =>
          new Date(record.datetime).toLocaleDateString("en-IN") === today
      )
      .reverse();
    // update the current expense
    setCurrentExpense(
      expenseRecords.reduce((acc, record) => acc + record.amount, 0)
    );

    return expenseRecords;
  }, [expenseRecords, updateId]);

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

        <CreateUpdateExpenseModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          setUpdateId={setUpdateId}
          updateId={updateId}
        />

        {expenseRecordsMemoized.map((record) => (
          <div
            className="bg-app-100 p-2 w-full rounded-lg flex justify-between items-center"
            key={record.datetime}
          >
            <div className="flex flex-col justify-between">
              <div className="flex gap-5 items-center">
                <h2 className="text-2xl">{record.discretion}</h2>
                <div className="flex gap-3">
                  <Pencil
                    className="h-4 w-4 text-app-700 cursor-pointer"
                    onClick={() => {
                      setUpdateId(record.datetime);
                      setIsDialogOpen(true);
                    }}
                  />
                  <Trash2
                    className="h-4 w-4 text-app-error-700 cursor-pointer"
                    onClick={() => removeExpense(record.datetime)}
                  />
                </div>
              </div>
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
