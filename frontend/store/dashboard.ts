import { Transaction } from "@/services/dashboard";
import { create } from "zustand";

export interface Overview {
  monthly_income: number;
  monthly_expense: number;
  savings: number;
  savings_rate: number;
}
export interface BudgetSummary {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
}

export interface MonthlyTrend {
  month: number;
  total: number;
}
export interface MonthlyTrend {
  month: number;
  total: number;
}

interface DashboardStore {
  overview: Overview | null;
  budgetSummary: BudgetSummary[] | null;
  transactions: Transaction[];
  monthlyTrend: MonthlyTrend[];

  setOverview: (data: Overview | null) => void;
  setBudgetSummary: (data: BudgetSummary[] | null) => void;
  setTransactions: (data: Transaction[]) => void;
  setMonthlyTrend: (data: MonthlyTrend[]) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  overview: null,
  budgetSummary: null,
  transactions: [],
  monthlyTrend: [],
  setOverview: (overview: Overview | null) => set({ overview }),

  setBudgetSummary: (budgetSummary: BudgetSummary[] | null) => set({ budgetSummary }),

  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  setMonthlyTrend: (monthlyTrend) =>
    set({ monthlyTrend }),
}));
