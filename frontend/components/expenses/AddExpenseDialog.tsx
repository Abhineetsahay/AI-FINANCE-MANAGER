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
import toast from "react-hot-toast";

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
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (category.trim().length < 3) {
      toast.error("Category must be at least 3 characters");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!expenseDate) {
      toast.error("Please select an expense date");
      return;
    }

    const selectedDate = new Date(expenseDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      toast.error("Expense date cannot be in the future");
      return;
    }

    try {
      setLoading(true);

      await createExpense({
        amount: Number(amount),
        category: category.trim(),
        description: description.trim(),
        expense_date: expenseDate,
      });

      setAmount("");
      setCategory("");
      setDescription("");
      setExpenseDate("");

      toast.success("Expense added successfully", {
        duration: 3000,
        style: {
          background: "#111C3D",
          color: "#fff",
          border: "1px solid #10B981",
        },
        icon: "✅",
      });

      setOpen(false);

      onSuccess?.();
    } catch (error) {
      console.error(error);

      toast.error("Error while adding expense", {
        duration: 3000,
        style: {
          background: "#111C3D",
          color: "#fff",
          border: "1px solid #EF4444",
        },
      });
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
            className="
    w-full
    rounded-full
    border-2
    border-[#2E62FF]
    bg-transparent
    text-white
    transition-all
    duration-300
    hover:border-[#8B5CF6]
    hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]
    hover:bg-[#2E62FF]/10   
  "
          >
            {loading ? "Creating..." : "Create Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
