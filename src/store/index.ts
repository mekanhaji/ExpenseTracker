import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ExpenseRecord = {
  datetime: string;
  amount: number;
  discretion: string;
};

export type ExpenseStore = {
  expense: number;
  dailyLimit: number;
  warningLimit: number;
  currency: string;
  expenseRecords: ExpenseRecord[];
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
      expense: 0,
      dailyLimit: 100,
      currency: "₹",
      warningLimit: 80,
      expenseRecords: [],
      addExpense: (expense, discretion) =>
        set(() => {
          const expenseRecord = createExpenseRecord(
            expense,
            discretion || "Expense"
          );
          return {
            expense: get().expense + expense,
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
            state.expense -= state.expenseRecords[index].amount;
            state.expenseRecords.splice(index, 1);
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
