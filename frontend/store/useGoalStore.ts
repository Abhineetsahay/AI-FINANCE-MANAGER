import { create } from "zustand";

import {
    Goal,
    getGoals,
    deleteGoal,
    updateGoal,
} from "@/services/goals";

interface GoalState {
    goals: Goal[];
    loading: boolean;

    fetchGoals: () => Promise<void>;
    updateGoal: (goalId: number, savedAmount: number) => Promise<void>;
    removeGoal: (goalId: number) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
    goals: [],
    loading: true,

    fetchGoals: async () => {
        try {
            const data = await getGoals();

            set({
                goals: data,
                loading: false,
            });
        } catch (error) {
            console.error(error);

            set({
                loading: false,
            });
        }
    },
    updateGoal: async (goalId: number, savedAmount: number) => {
        try {
            await updateGoal(goalId, savedAmount);

            set((state) => ({
                goals: state.goals.map((goal) =>
                    goal.goal_id === goalId
                        ? {
                            ...goal,
                            saved_amount: savedAmount,
                            is_achieved:
                                savedAmount >= goal.target_amount,
                        }
                        : goal
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    },
    removeGoal: async (goalId: number) => {
        try {
            await deleteGoal(goalId);

            set((state) => ({
                goals: state.goals.filter(
                    (goal) => goal.goal_id !== goalId,
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    },
}));