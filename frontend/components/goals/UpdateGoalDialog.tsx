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
import toast from "react-hot-toast";

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
  const [userClick, setUserClick] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    try {
      const value = Number(amount);

      if (!value || value <= 0) {
        toast.error("Add a valid value", {
          duration: 3000,
          style: {
            background: "#111C3D",
            color: "#fff",
            border: "1px solid #EF4444",
          },
        });
        return;
      }

      setUserClick(true);
      await onUpdate(goalId, currentSaved + value);

      setAmount("");
      setUserClick(false);
      setOpen(false);
      toast.success("Goal updated successfully", {
        duration: 3000,
        style: {
          background: "#111C3D",
          color: "#fff",
          border: "1px solid #10B981",
        },
        icon: "✅",
      });
    } catch (error) {
      toast.error("Failed to update Goal", {
        duration: 3000,
        style: {
          background: "#111C3D",
          color: "#fff",
          border: "1px solid #EF4444",
        },
      });
      console.error(error);
    }
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

          <Button
            onClick={handleSubmit}
            disabled={userClick}
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
            {userClick ? "Updating..." : "Update Goal"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
