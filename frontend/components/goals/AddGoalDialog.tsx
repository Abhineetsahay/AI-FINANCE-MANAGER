"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createGoal } from "@/services/goals";
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

interface AddGoalDialogProps {
  onSuccess?: () => void;
}

export default function AddGoalDialog({ onSuccess }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);

  const [goal, setGoal] = useState("");

  const [targetAmount, setTargetAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!goal || !targetAmount) return;

    try {
      setLoading(true);

      await createGoal({
        goal,
        target_amount: Number(targetAmount),
      });

      setGoal("");
      setTargetAmount("");

      setOpen(false);

      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-[#2E62FF] to-[#10B981]">
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-[#111C3D] text-white">
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Goal Name</Label>

            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="New Laptop"
              className="mt-2 border-slate-700 bg-slate-900"
            />
          </div>

          <div>
            <Label>Target Amount</Label>

            <Input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="100000"
              className="mt-2 border-slate-700 bg-slate-900"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-linear-to-r from-[#2E62FF] to-[#10B981]"
          >
            {loading ? "Creating..." : "Create Goal"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
