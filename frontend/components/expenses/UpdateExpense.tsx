"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface EditExpenseDialogProps {
  expense: {
    expense_id: number;
    amount: number;
    category: string;
    description: string;
    expense_date: string;
  };

  onSave: (
    expense_id: number,
    data: {
      amount: number;
      category: string;
      description: string;
      date: string;
    },
  ) => Promise<void>;
}

export default function ExpenseDialog({
  expense,
  onSave,
}: EditExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [userClick, setUserClick] = useState(false);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [description, setDescription] = useState(expense.description);
  const [date, setDate] = useState(expense.expense_date);

  const handleSubmit = async () => {
    try {
      setUserClick(true);
      await onSave(expense.expense_id, {
        amount,
        category,
        description,
        date,
      });
      setUserClick(false);
      setOpen(false);
      toast.success("Task updated successfully", {
        duration: 3000,
        style: {
          background: "#111C3D",
          color: "#fff",
          border: "1px solid #10B981",
        },
        icon: "✅",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Goal", {
        duration: 3000,
        style: {
          background: "#111C3D",
          color: "#fff",
          border: "1px solid #EF4444",
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border border-slate-700 bg-linear-to-br from-[#111C3D] via-[#152552] to-[#0D1735] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />

          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Button
            className=" w-full
    rounded-full
    border-2
    border-[#2E62FF]
    bg-transparent
    text-white
    transition-all
    duration-300
    hover:border-[#8B5CF6]
    hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]
    hover:bg-[#2E62FF]/10 "
            onClick={handleSubmit}

          >
            {userClick ? "Updating the expense" : "Update Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
