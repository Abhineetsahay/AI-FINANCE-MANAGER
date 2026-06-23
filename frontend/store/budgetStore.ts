import { create } from "zustand";

import {
    Budget,
    getBudgets,
    createBudget,
    deleteBudget,
} from "@/services/budgets";

interface BudgetState {
    budgets: Budget[];
    loading: boolean;

    loadBudgets: () => Promise<void>;

    addBudget: (data: {
        category: string;
        monthly_limit: number;
        effective_from: string;
    }) => Promise<void>;

    removeBudget: (budgetId: number) => Promise<void>;
}

export const useBudgetStore = create<BudgetState>((set) => ({
    budgets: [],
    loading: true,

    loadBudgets: async () => {
        try {
            const data = await getBudgets();

            set({
                budgets: data,
                loading: false,
            });
        } catch (error) {
            console.error(error);

            set({
                loading: false,
            });
        }
    },

    addBudget: async (budgetData) => {
        try {
            const newBudget = await createBudget(budgetData);

            set((state) => ({
                budgets: [...state.budgets, newBudget],
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    removeBudget: async (budgetId) => {
        try {
            await deleteBudget(budgetId);

            set((state) => ({
                budgets: state.budgets.filter(
                    (budget) => budget.budget_id !== budgetId
                ),
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}));