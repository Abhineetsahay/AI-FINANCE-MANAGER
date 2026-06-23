import { create } from "zustand";

import {
    getExpenses,
    updateExpense,
    deleteExpense
} from "@/services/expenses";

export interface Expense {
    expense_id: number;
    amount: number;
    category: string;
    description: string;
    expense_date: string;
}
export interface Data {
    amount: number;
    category: string;
    description: string;
    date: string;
}
interface ExpenseState {
    expenses: Expense[];
    loading: boolean;

    loadExpenses: () => Promise<void>;
    updateExpenseItem: (id: number, data: Data) => Promise<void>;
    removeExpense: (id: number) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
    expenses: [],
    loading: true,

    loadExpenses: async () => {
        try {
            const data = await getExpenses();

            set({
                expenses: data,
                loading: false,
            });
        } catch (error) {
            console.error(error);

            set({
                loading: false,
            });
        }
    },
    updateExpenseItem: async (id, data) => {
        try {
            await updateExpense(id, data);

            set((state) => ({
                expenses: state.expenses.map((expense) =>
                    expense.expense_id === id
                        ? {
                            ...expense,
                            amount: data.amount,
                            category: data.category,
                            description: data.description,
                            expense_date: data.date,
                        }
                        : expense
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    },
    removeExpense: async (id: number) => {
        try {
            await deleteExpense(id);

            set((state) => ({
                expenses: state.expenses.filter(
                    (expense) => expense.expense_id !== id
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    },
}));