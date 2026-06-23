import api from "@/lib/api";

export interface Goal {
  goal_id: number;
  goal: string;
  target_amount: number;
  saved_amount: number;
  is_achieved: boolean;
}

export const getGoals = async (): Promise<Goal[]> => {
  const response = await api.get("/goals");
  return response.data;
};

export const createGoal = async (data: {
  goal: string;
  target_amount: number;
}) => {
  const response = await api.post("/goals", data);
  return response.data;
};

export const updateGoal = async (
  goalId: number,
  savedAmount: number
) => {
  const response = await api.put(`/goals/${goalId}`, {
    saved_amount: savedAmount,
  });

  return response.data;
};

export const deleteGoal = async (goalId: number) => {
  const response = await api.delete(`/goals/${goalId}`);
  return response.data;
};

export const getGoalProgress = async (goalId: number) => {
  const response = await api.get(
    `/goals/${goalId}/progress`
  );

  return response.data;
};