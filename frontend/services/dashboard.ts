import api from "@/lib/api";

export interface DashboardOverview {
    monthly_income: number;
    monthly_expenses: number;
    remaining_balance: number;
    savings_rate: number;
    active_goals: number;
    active_budgets: number;
}

export interface BudgetSummary {
    total_allocated: number;
    total_spent: number;
    remaining: number;
    budget_utilization: number;
}

export interface Transaction {
    id: number;
    description: string;
    category: string;
    amount: number;
    expense_date: string;
}

export interface Insight {
    recommendations: string[];
    risk_score: number;
    financial_health: string;
}

export interface MonthlyTrend {
    month: number;
    total: number;
}


export const getOverview = async () => {
    const res = await api.get("/dashboard/summary");

    return res.data;
};

export const getBudgetSummary = async () => {
    const res = await api.get("/budgets/status");
    return res.data;
};

export const getRecentTransactions = async () => {
    const res = await api.get(
        "/dashboard/recent-expenses"
    );

    return res.data;
};

export const getMonthlyTrend = async () => {
    const res = await api.get("/dashboard/monthly-trend");

    return res.data;
};