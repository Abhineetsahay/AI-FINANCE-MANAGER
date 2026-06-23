"use client";

import { useEffect } from "react";

import { Target, Plus, Trash2, CheckCircle2 } from "lucide-react";

import { useGoalStore } from "@/store/useGoalStore";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import AddGoalDialog from "@/components/goals/AddGoalDialog";

export default function GoalsPage() {
  const { goals, loading, fetchGoals, removeGoal } = useGoalStore();

  useEffect(() => {
    if (goals.length === 0) {
      void fetchGoals();
    }
  }, [goals.length, fetchGoals]);

  const totalTarget = goals.reduce((acc, goal) => acc + goal.target_amount, 0);

  const totalSaved = goals.reduce((acc, goal) => acc + goal.saved_amount, 0);

  const overallProgress =
    totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  if (loading) {
    return <p className="text-slate-400">Loading goals...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Savings Goals</p>

          <h1 className="text-4xl font-bold text-white">Financial Goals</h1>
        </div>

        <AddGoalDialog onSuccess={fetchGoals} />
      </div>

      {/* Summary */}
      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="p-8">
          <p className="text-sm text-slate-400">Total Savings</p>

          <h2 className="mt-2 text-5xl font-bold text-white">
            ₹{totalSaved.toLocaleString()}
          </h2>

          <p className="mt-3 text-slate-400">
            Target ₹{totalTarget.toLocaleString()}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-slate-400">Overall Progress</span>

              <span className="text-sm text-[#10B981]">
                {overallProgress.toFixed(1)}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-[#10B981]"
                style={{
                  width: `${overallProgress}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => {
          const progress =
            goal.target_amount > 0
              ? (goal.saved_amount / goal.target_amount) * 100
              : 0;

          return (
            <Card key={goal.goal_id} className="border-slate-800 bg-[#111C3D]">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-xl bg-[#8B5CF6]/20 p-3">
                    <Target className="h-5 w-5 text-[#8B5CF6]" />
                  </div>

                  <div className="flex items-center gap-2">
                    {goal.is_achieved && (
                      <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeGoal(goal.goal_id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {goal.goal}
                </h3>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saved</span>

                    <span className="font-semibold text-white">
                      ₹{goal.saved_amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Target</span>

                    <span className="font-semibold text-white">
                      ₹{goal.target_amount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-slate-400">Progress</span>

                    <span className="text-sm text-[#10B981]">
                      {progress.toFixed(0)}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-[#10B981]"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {goals.length === 0 && (
        <Card className="border-dashed border-slate-700 bg-[#111C3D]">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Plus className="mb-4 h-10 w-10 text-slate-500" />

            <p className="text-slate-400">No goals created yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
