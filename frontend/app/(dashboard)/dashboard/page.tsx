"use client";

import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboard";

export default function DashboardPage() {
  const { overview, budgetSummary, transactions } = useDashboardStore();
  const hasBudgetSummary =
    budgetSummary !== null && Object.keys(budgetSummary).length > 0;

  if (!overview || !budgetSummary) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-slate-400">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-400">Financial Overview</p>

        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Wallet className="h-8 w-8 text-[#2E62FF]" />

              <span className="text-xs text-[#10B981]">Balance</span>
            </div>

            <p className="mt-4 text-sm text-slate-400">Total Balance</p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              ₹{overview.savings}
            </h2>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-[#10B981]" />

              <span className="text-xs text-[#10B981]">Income</span>
            </div>

            <p className="mt-4 text-sm text-slate-400">Monthly Income</p>

            <h2 className="mt-2 text-3xl font-bold text-[#10B981]">
              ₹{overview.monthly_income}
            </h2>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <TrendingDown className="h-8 w-8 text-red-400" />

              <span className="text-xs text-red-400">Expenses</span>
            </div>

            <p className="mt-4 text-sm text-slate-400">Monthly Expenses</p>

            <h2 className="mt-2 text-3xl font-bold text-red-400">
              ₹{overview.monthly_expense}
            </h2>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <PiggyBank className="h-8 w-8 text-[#8B5CF6]" />

              <span className="text-xs text-[#8B5CF6]">Savings</span>
            </div>

            <p className="mt-4 text-sm text-slate-400">Savings Rate</p>

            <h2 className="mt-2 text-3xl font-bold text-[#8B5CF6]">
              {overview.savings_rate}%
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Middle */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Budget Summary */}
        <Card className="lg:col-span-2 border-slate-800 bg-[#111C3D]">
          <CardHeader>
            <CardTitle className="text-white">Budget Summary</CardTitle>
          </CardHeader>

          {hasBudgetSummary ? (
            budgetSummary.map((summary) => {
              const utilizationPercentage =
                summary.budget > 0
                  ? ((summary.budget - summary.remaining) / summary.budget) *
                    100
                  : 0;

              return (
                <CardContent key={summary.category} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-slate-400">Category</p>

                      <p className="mt-2 text-2xl font-bold text-white">
                        {summary.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">Budget</p>

                      <p className="mt-2 text-2xl font-bold text-white">
                        ₹{summary.budget}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">Remaining</p>

                      <p className="mt-2 text-2xl font-bold text-[#10B981]">
                        ₹{summary.remaining}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm text-slate-400">
                      <span>Budget Utilization</span>

                      <span>{utilizationPercentage.toFixed(0)}%</span>
                    </div>

                    <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          utilizationPercentage >= 90
                            ? "bg-red-500"
                            : utilizationPercentage >= 70
                              ? "bg-yellow-500"
                              : "bg-[#2E62FF]"
                        }`}
                        style={{
                          width: `${Math.min(utilizationPercentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              );
            })
          ) : (
            <div className="px-6 py-6 text-slate-400">
              No budget allocated till now
            </div>
          )}
        </Card>
      </div>

      {/* Transactions */}
      <Card className="border-slate-800 bg-[#111C3D]">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-3 text-left text-slate-400">Description</th>

                  <th className="py-3 text-left text-slate-400">Category</th>

                  <th className="py-3 text-left text-slate-400">Amount</th>

                  <th className="py-3 text-left text-slate-400">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions?.map((tx, index) => (
                  <tr
                    key={`${tx.id}-${index}`}
                    className="border-b border-slate-800"
                  >
                    <td className="py-4 text-white">{tx.description}</td>

                    <td className="py-4 text-slate-300">{tx.category}</td>

                    <td className="py-4 text-red-400">₹{tx.amount}</td>

                    <td className="py-4 text-slate-400">{tx.expense_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
