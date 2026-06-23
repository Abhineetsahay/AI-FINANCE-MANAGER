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
import toast from "react-hot-toast";
import { useBudgetStore } from "@/store/budgetStore";

interface Props {
  onSuccess: () => void;
}

export default function AddBudgetDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [loading, setLoading] = useState(false);
  const { addBudget } = useBudgetStore();

  const handleCreate = async () => {
    try {
      const limit = Number(monthlyLimit);
      if (limit <= 0 || !limit) {
        toast.error("Enter a valid montly_limit", {
          duration: 3000,
          style: {
            background: "#111C3D",
            color: "#fff",
            border: "1px solid #EF4444",
          },
        });
        return;
      }
      if (category === "") {
        toast.error("Enter a valid category", {
          duration: 3000,
          style: {
            background: "#111C3D",
            color: "#fff",
            border: "1px solid #EF4444",
          },
        });
        return;
      }
      setLoading(true);

      setOpen(true);
      await addBudget({
        category,
        monthly_limit: limit,
        effective_from: effectiveFrom,
      });
      toast.success("Budget Added successfully", {
        duration: 3000,
        style: {
          background: "#111C3D",
          color: "#fff",
          border: "1px solid #10B981",
        },
        icon: "✅",
      });
      onSuccess?.();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setOpen(false);
      toast.error("Failed to add Goal", {
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
        <Button className="bg-linear-to-r from-[#2E62FF] to-[#10B981]">
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-[#111C3D] text-white">
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Category</Label>

            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Monthly Limit</Label>

            <Input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Effective From</Label>

            <Input
              type="date"
              value={effectiveFrom}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setEffectiveFrom(e.target.value)}
            />
          </div>

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="  w-full
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
          >
            {loading ? "Creating..." : "Create Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
