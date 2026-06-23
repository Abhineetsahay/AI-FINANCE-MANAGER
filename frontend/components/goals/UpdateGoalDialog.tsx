"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UpdateGoalDialogProps {
  goalId: number;
  currentSaved: number;
  onUpdate: (goalId: number, savedAmount: number) => Promise<void>;
}

export default function UpdateGoalDialog({
  goalId,
  currentSaved,
  onUpdate,
}: UpdateGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    const value = Number(amount);

    if (!value || value <= 0) return;

    await onUpdate(goalId, currentSaved + value);

    setAmount("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border border-slate-700 bg-linear-to-br from-[#111C3D] via-[#152552] to-[#0D1735] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle>Add Savings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Enter amount saved"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button className="w-full" onClick={handleSubmit}>
            Update Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
