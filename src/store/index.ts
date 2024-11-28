import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ExpenseRecord = {
  datetime: string;
  amount: number;
  discretion: string;
};

export type ExpenseStore = {
  currentExpense: number;
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
    }),
    {
      name: "expense-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
// -----------------------------------------------------------------

export type UserSettings = {
  dailyLimit: number;
  warningLimit: number;
  currency: string;
  theme: "light" | "dark";

  updateDailyLimit: (dailyLimit: number) => void;
  updateCurrency: (currency: string) => void;
  updateWarningLimit: (warningLimit: number) => void;
  toggleTheme: () => void;
};

const useUserSettingsStore = create(
  persist<UserSettings>(
    (set) => ({
      dailyLimit: 100,
      currency: "₹",
      warningLimit: 80,
      theme: "light",
      updateDailyLimit: (dailyLimit) => set({ dailyLimit }),
      updateCurrency: (currency) => set({ currency }),
      updateWarningLimit: (warningLimit) => set({ warningLimit }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "user-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useExpenseStore, useUserSettingsStore };
