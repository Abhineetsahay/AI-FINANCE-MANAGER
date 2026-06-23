"use client";

import { useEffect } from "react";
import { Wallet, Calendar, Trash2, Plus } from "lucide-react";
import AddBudgetDialog from "@/components/budgets/AddBudgetDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBudgetStore } from "@/store/budgetStore";
import BudgetsSkeleton from "@/components/budgets/BudgetsSkeleton";

export default function BudgetsPage() {
  const { budgets, loading, loadBudgets, removeBudget } = useBudgetStore();

  useEffect(() => {
    void loadBudgets();
  }, [loadBudgets]);


  if (loading) {
    return <BudgetsSkeleton/>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Budget Management</p>

          <h1 className="text-4xl font-bold text-white">Budgets</h1>
        </div>

        <AddBudgetDialog onSuccess={loadBudgets} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {budgets.map((budget) => (
          <Card
            key={budget.budget_id}
            className="border-slate-800 bg-[#111C3D]"
          >
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-xl bg-[#2E62FF]/20 p-3">
                  <Wallet className="h-5 w-5 text-[#2E62FF]" />
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeBudget(budget.budget_id)}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>

              <h3 className="text-xl font-semibold text-white">
                {budget.category}
              </h3>

              <p className="mt-3 text-3xl font-bold text-[#10B981]">
                ₹{budget.monthly_limit.toLocaleString()}
              </p>

              <div className="mt-4 flex items-center gap-2 text-slate-400">
                <Calendar className="h-4 w-4" />

                <span>{budget.effective_from}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {budgets.length === 0 && (
        <Card className="border-dashed border-slate-700 bg-[#111C3D]">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Plus className="mb-4 h-10 w-10 text-slate-500" />

            <p className="text-slate-400">No budgets created yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
