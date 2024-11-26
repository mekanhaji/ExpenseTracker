import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ExpenseRecord = {
  datetime: string;
  amount: number;
  discretion: string;
};

export type ExpenseStore = {
  currentExpense: number;
  dailyLimit: number;
  warningLimit: number;
  currency: string;
  expenseRecords: ExpenseRecord[];
  /**
   * Set the current expense
   *
   * @param expense
   * @returns
   */
  setCurrentExpense: (expense: number) => void;
  /**
   * Get expense record by timestamp
   *
   * @param timestamp
   * @returns
   */
  getExpenseRecord: (timestamp: string) => ExpenseRecord | undefined;
  /**
   * Add expense to the total expense
   *
   * @param expense
   * @returns
   */
  addExpense: (expense: number, discretion?: string) => void;
  /**
   * Update the total expense
   *
   * @param expense
   * @returns
   */
  updateExpense: (timestamp: string, record: ExpenseRecord) => void;
  /**
   * Remove expense from the total expense
   *
   * @param timestamp
   * @returns
   */
  removeExpense: (timestamp: string) => void;
  /**
   * Update the daily limit
   *
   * @param dailyLimit
   * @returns
   */
  updateDailyLimit: (dailyLimit: number) => void;
  /**
   * Update the currency
   *
   * @param currency
   * @returns
   */
  updateCurrency: (currency: string) => void;
  /**
   * Update the warning limit
   *
   * @param warningLimit
   * @returns
   */
  updateWarningLimit: (warningLimit: number) => void;
};

const createExpenseRecord = (
  amount: number,
  discretion: string
): ExpenseRecord => {
  return {
    datetime: new Date().toISOString(),
    amount,
    discretion,
  };
};

const useExpenseStore = create(
  persist<ExpenseStore>(
    (set, get) => ({
      currentExpense: 0,
      dailyLimit: 100,
      currency: "₹",
      warningLimit: 80,
      expenseRecords: [],
      setCurrentExpense: (expense) => set({ currentExpense: expense }),
      getExpenseRecord: (timestamp) =>
        get().expenseRecords.find((record) => record.datetime === timestamp),
      addExpense: (expense, discretion) =>
        set(() => {
          const expenseRecord = createExpenseRecord(
            expense,
            discretion || "Expense"
          );
          return {
            expenseRecords: [...get().expenseRecords, expenseRecord],
          };
        }),
      updateWarningLimit: (warningLimit) => set({ warningLimit }),
      updateExpense: (timestamp, record) =>
        set((state) => {
          const index = state.expenseRecords.findIndex(
            (record) => record.datetime === timestamp
          );
          if (index !== -1) {
            state.expenseRecords[index] = record;
          }
          return state;
        }),
      removeExpense: (timestamp) => {
        set((state) => {
          const index = state.expenseRecords.findIndex(
            (record) => record.datetime === timestamp
          );
          if (index !== -1) {
            const updatedRecords = [...state.expenseRecords];
            updatedRecords.splice(index, 1);
            return {
              expenseRecords: updatedRecords,
            };
          }
          return state;
        });
      },
      updateDailyLimit: (dailyLimit) => set({ dailyLimit }),
      updateCurrency: (currency) => set({ currency }),
    }),
    {
      name: "expense-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useExpenseStore };
