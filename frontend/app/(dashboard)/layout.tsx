"use client";

import { useEffect } from "react";

import {
  getOverview,
  getBudgetSummary,
  getRecentTransactions,
  getMonthlyTrend,
} from "@/services/dashboard";

import { useDashboardStore } from "@/store/dashboard";

import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    overview,
    setOverview,
    setBudgetSummary,
    setTransactions,
    setMonthlyTrend,
  } = useDashboardStore();

  useEffect(() => {
    const loadData = async () => {
      if (overview) return;

      try {
        const [overviewData, budgetData, transactionData, monthlyTrend] =
          await Promise.all([
            getOverview(),
            getBudgetSummary(),
            getRecentTransactions(),
            getMonthlyTrend(),
          ]);

        setOverview(overviewData);
        setBudgetSummary(budgetData);
        setTransactions(transactionData);
        setMonthlyTrend(monthlyTrend);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [
    overview,
    setBudgetSummary,
    setOverview,
    setTransactions,
    setMonthlyTrend,
  ]);

  return (
    <div className="flex min-h-screen bg-[#07112B]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
