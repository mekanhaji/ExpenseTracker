import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useExpenseStore } from "@/store";

const percentage = (current: number, total: number) => {
  if (current > total) return 100;

  return (current / total) * 100;
};
const ExpenseProgressHeader = () => {
  const {
    currency,
    currentExpense: expense,
    dailyLimit,
    warningLimit,
  } = useExpenseStore();
  return (
    <div
      className={cn("flex flex-col gap-2 p-2 rounded-lg w-full", {
        "bg-app-error-100": expense >= dailyLimit,
        "bg-app-warning-100": expense >= warningLimit && expense < dailyLimit,
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
  );
};

export default ExpenseProgressHeader;
