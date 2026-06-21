"use client";

import { useEffect } from "react";

import {
  getOverview,
  getBudgetSummary,
  getRecentTransactions,
} from "@/services/dashboard";

import { useDashboardStore } from "@/store/dashboard";

import Sidebar from "@/components/dashboard/sidebar";
// import Topbar from "@/components/dashboard/topbar";

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
  } = useDashboardStore();

  useEffect(() => {
    const loadData = async () => {
      if (overview) return;

      try {
        const [
          overviewData,
          budgetData,
          transactionData,
        ] = await Promise.all([
          getOverview(),
          getBudgetSummary(),
          getRecentTransactions(),
        ]);

        setOverview(overviewData);
        setBudgetSummary(budgetData);
        setTransactions(transactionData);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [overview]);

  return (
    <div className="flex min-h-screen bg-[#07112B]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* <Topbar /> */}

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}