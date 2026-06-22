"use client";

import { useState } from "react";
import { ArrowRight, IndianRupee, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

import { registerUser } from "@/services/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterFormProps = {
  onSuccess?: () => void;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userIncome, setUserIncome] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser({
        username,
        email,
        password,
        user_income: Number(userIncome),
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setUserIncome("");

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4">
      <div className="space-y-2">
        <Label className="block text-(--text)/90">Username</Label>

        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted)" />

          <Input
            type="text"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 border-(--border) bg-(--background)/80 pl-10 text-(--text) placeholder:text-(--muted) focus-visible:ring-(--primary)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="block text-(--text)/90">Email</Label>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted)" />

          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-(--border) bg-(--background)/80 pl-10 text-(--text) placeholder:text-(--muted) focus-visible:ring-(--primary)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="block text-(--text)/90">Password</Label>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted)" />

          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-(--border) bg-(--background)/80 pl-10 text-(--text) placeholder:text-(--muted) focus-visible:ring-(--primary)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="block text-(--text)/90">User Income</Label>

        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted)" />

          <Input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={userIncome}
            onChange={(e) => setUserIncome(e.target.value)}
            className="h-12 border-(--border) bg-(--background)/80 pl-10 text-(--text) placeholder:text-(--muted) focus-visible:ring-(--primary)"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-(--primary) font-semibold text-(--text) shadow-lg shadow-black/20 hover:opacity-90"
      >
        {loading ? "Creating Account..." : "Create Account"}

        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
}
