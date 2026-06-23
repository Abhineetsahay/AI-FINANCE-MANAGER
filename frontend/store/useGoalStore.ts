import { create } from "zustand";

import {
    Goal,
    getGoals,
    deleteGoal,
} from "@/services/goals";

interface GoalState {
    goals: Goal[];
    loading: boolean;

    fetchGoals: () => Promise<void>;
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