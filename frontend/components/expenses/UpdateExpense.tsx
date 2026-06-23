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

  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [description, setDescription] = useState(expense.description);
  const [date, setDate] = useState(expense.expense_date);

  const handleSubmit = async () => {
    await onSave(expense.expense_id, {
      amount,
      category,
      description,
      date,
    });

    setOpen(false);
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

          <Button className="w-full" onClick={handleSubmit}>
            Update Expense
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
