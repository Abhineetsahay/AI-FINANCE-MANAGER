import { create } from "zustand";

import {
    Budget,
    getBudgets,
} from "@/services/budgets";

interface BudgetState {
    budgets: Budget[];
    loading: boolean;

    loadBudgets: () => Promise<void>;
    addBudget: (budget: Budget) => void;
    removeBudget: (budgetId: number) => void;
}

export const useBudgetStore =
    create<BudgetState>((set) => ({
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

        addBudget: (budget) =>
            set((state) => ({
                budgets: [
                    ...state.budgets,
                    budget,
                ],
            })),

        removeBudget: (budgetId) =>
            set((state) => ({
                budgets: state.budgets.filter(
                    (budget) =>
                        budget.budget_id !== budgetId
                ),
            })),
    }));