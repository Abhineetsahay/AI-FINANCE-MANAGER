"use client";

import { useEffect, useMemo, useState } from "react";

import { Calendar, Receipt, TrendingDown, Pencil, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddExpenseDialog from "@/components/expenses/AddExpenseDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getExpenses, deleteExpense } from "@/services/expenses";

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  expense_date: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await getExpenses();
        
        setExpenses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const topCategory = useMemo(() => {
    const totals: Record<string, number> = {};

    expenses.forEach((expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) + expense.amount;
    });

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  }, [expenses]);

  const categories = [
    "all",
    ...new Set(expenses.map((expense) => expense.category)),
  ];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || expense.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading Expenses...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-400">Expense Management</p>

        <h1 className="text-4xl font-bold text-white">Expenses</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <Receipt className="h-8 w-8 text-[#2E62FF]" />

              <span className="text-xs text-[#10B981]">Total</span>
            </div>

            <p className="text-sm text-slate-400">Total Spending</p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              ₹{totalExpenses.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <TrendingDown className="h-8 w-8 text-red-400" />

              <span className="text-xs text-slate-400">Top Category</span>
            </div>

            <p className="text-sm text-slate-400">Highest Spending</p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {topCategory}
            </h2>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <Calendar className="h-8 w-8 text-[#10B981]" />

              <span className="text-xs text-slate-400">Transactions</span>
            </div>

            <p className="text-sm text-slate-400">Total Records</p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {expenses.length}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <Input
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm border-slate-700 bg-slate-900"
          />

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-55 border-slate-700 bg-slate-900">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto">
            <AddExpenseDialog
              onSuccess={async () => {
                const data = await getExpenses();
                setExpenses(data);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-slate-800 bg-[#111C3D]">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-3 text-left text-slate-400">Date</th>

                  <th className="py-3 text-left text-slate-400">Description</th>

                  <th className="py-3 text-left text-slate-400">Category</th>

                  <th className="py-3 text-left text-slate-400">Amount</th>

                  <th className="py-3 text-left text-slate-400">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-slate-800">
                    <td className="py-4 text-slate-300">{expense.expense_date}</td>

                    <td className="py-4 text-white">{expense.description}</td>

                    <td className="py-4">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {expense.category}
                      </span>
                    </td>

                    <td className="py-4 font-semibold text-red-400">
                      ₹{expense.amount.toLocaleString()}
                    </td>

                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(expense.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </td>
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
