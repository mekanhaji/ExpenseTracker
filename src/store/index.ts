import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ExpenseStore = {
  expense: number;
  dailyLimit: number;
  warningLimit: number;
  currency: string;
  /**
   * Add expense to the total expense
   *
   * @param expense
   * @returns
   */
  addExpense: (expense: number) => void;
  /**
   * Update the total expense
   *
   * @param expense
   * @returns
   */
  updateExpense: (expense: number) => void;
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

const useExpenseStore = create(
  persist<ExpenseStore>(
    (set, get) => ({
      expense: 0,
      dailyLimit: 100,
      currency: "₹",
      warningLimit: 80,
      addExpense: (expense) => set({ expense: get().expense + expense }),
      updateWarningLimit: (warningLimit) => set({ warningLimit }),
      updateExpense: (expense) => set({ expense }),
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
