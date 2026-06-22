import api from "@/lib/api";

export interface Budget {
    budget_id: number;
    category: string;
    monthly_limit: number;
    effective_from: string;
}

export const getBudgets = async () => {
    const response = await api.get("/budgets");

    return response.data;
};

export const createBudget = async (data: {
    category: string;
    monthly_limit: number;
    effective_from: string;
}) => {
    const response = await api.post(
        "/budgets",
        data
    );

    return response.data;
};

export const updateBudget = async (
    budgetId: number,
    data: {
        monthly_limit: number;
    }
) => {
    const response = await api.put(
        `/budgets/${budgetId}`,
        data
    );

    return response.data;
};

export const deleteBudget = async (
    budgetId: number
) => {
    const response = await api.delete(
        `/budgets/${budgetId}`
    );

    return response.data;
};