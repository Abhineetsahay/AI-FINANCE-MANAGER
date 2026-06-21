import { Transaction } from "@/services/dashboard";
import { create } from "zustand";

export interface Overview {
  monthly_income: number;
  monthly_expense: number;
  savings: number;
  savings_rate: number;
}
export interface BudgetSummary {
  total_allocated: number;
  total_spent: number;
  remaining: number;
  budget_utilization: number;
}

interface DashboardStore {
  overview: Overview | null;
  budgetSummary: BudgetSummary | null;
  transactions: Transaction[];

  setOverview: (data: Overview | null) => void;
  setBudgetSummary: (data: BudgetSummary | null) => void;
  setTransactions: (data: Transaction[]) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  overview: null,
  budgetSummary: null,
  transactions: [],

  setOverview: (overview: Overview | null) => set({ overview }),

  setBudgetSummary: (budgetSummary: BudgetSummary | null) => set({ budgetSummary }),

  setTransactions: (transactions: Transaction[]) => set({ transactions }),
}));
