import { useExpenseStore, useUserSettingsStore } from "@/store";
import { Clock12Icon, Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";

const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

type ExpenseRecordsListProps = {
  setIsDialogOpen: (isOpen: boolean) => void;
  setUpdateId: (id: string | null) => void;
  updateId: string | null;
};

const ExpenseRecordsList = (props: ExpenseRecordsListProps) => {
  const { setIsDialogOpen, setUpdateId, updateId } = props;
  const {
    expenseRecords,

    removeExpense,
    setCurrentExpense,
  } = useExpenseStore();
  const currency = useUserSettingsStore((state) => state.currency);

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
    <>
      {expenseRecordsMemoized.map((record) => (
        <div
          className="bg-app-100 dark:bg-app-800 p-2 w-full rounded-lg flex justify-between items-center"
          key={record.datetime}
        >
          <div className="flex flex-col justify-between">
            <div className="flex gap-5 items-center">
              <h2 className="text-2xl">{record.discretion}</h2>
              <div className="flex gap-3">
                <Pencil
                  className="h-4 w-4 text-app-700 dark:text-app-950 cursor-pointer"
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
            {currency}
            {record.amount}
          </h1>
        </div>
      ))}
    </>
  );
};

export default ExpenseRecordsList;
