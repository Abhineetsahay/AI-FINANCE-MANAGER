"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createExpense } from "@/services/expenses";

interface Props {
  onSuccess?: () => void;
}

export default function AddExpenseDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createExpense({
        amount: Number(amount),
        category,
        description,
        expense_date:expenseDate,
      });

      setAmount("");
      setCategory("");
      setDescription("");
      setExpenseDate("");

      setOpen(false);

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Failed to create expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-[#2E62FF] to-[#10B981]">
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-[#111C3D] text-white">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Amount</Label>

            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Category</Label>

            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Food"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Description</Label>

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Lunch"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Date</Label>

            <Input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#2E62FF]"
          >
            {loading ? "Creating..." : "Create Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
