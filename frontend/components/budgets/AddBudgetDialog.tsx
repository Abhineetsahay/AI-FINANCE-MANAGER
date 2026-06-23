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
import { createBudget } from "@/services/budgets";

interface Props {
  onSuccess: () => void;
}

export default function AddBudgetDialog({ onSuccess }: Props) {
  const [category, setCategory] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);

      await createBudget({
        category,
        monthly_limit: Number(monthlyLimit),
        effective_from: effectiveFrom,
      });

      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-[#2E62FF] to-[#10B981]">
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-[#111C3D] text-white h-2/6 lg:h-2/5">
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
            className="w-full bg-[#2E62FF]"
          >
            {loading ? "Creating..." : "Create Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
