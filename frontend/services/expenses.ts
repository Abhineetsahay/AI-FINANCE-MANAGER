import api from "@/lib/api";

export const getExpenses = async () => {
  const res = await api.get("/expenses");
  return res.data;
};

export const getExpense = async (id: number) => {
  const res = await api.get(`/expenses/${id}`);
  return res.data;
};

export const createExpense = async (data: {
  amount: number;
  category: string;
  description: string;
  expense_date: string;
}) => {
  const res = await api.post("/expenses", data);
  return res.data;
};

export const updateExpense = async (
  id: number,
  data: {
    amount: number;
    category: string;
    description: string;
    date: string;
  },
) => {
  const res = await api.put(`/expenses/${id}`, data);

  return res.data;
};

export const deleteExpense = async (id: number) => {
  const res = await api.delete(`/expenses/${id}`);

  return res.data;
};
