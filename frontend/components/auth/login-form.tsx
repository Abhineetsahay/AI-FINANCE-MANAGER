"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { loginUser } from "@/services/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser({
        email,
        password,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4">
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

      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-(--primary) font-semibold text-(--text) shadow-lg shadow-black/20 hover:opacity-90"
      >
        {loading ? "Signing In..." : "Sign In"}

        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
}
