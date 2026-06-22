"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

export default function Page() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <main className="relative min-h-screen overflow-hidden bg-(--background) text-(--text)">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-(--primary)/20 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-(--secondary)/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,98,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_28%)]" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden flex-col justify-between border-r border-(--border) p-16 lg:flex lg:gap-1">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary)">
                <Wallet className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-bold">AI Finance Manager</h2>

                <p className="text-sm text-slate-400">
                  Smart personal finance tracking
                </p>
              </div>
            </div>

            <div className="mt-24">
              <h1 className="max-w-lg text-5xl font-bold leading-tight tracking-tight">
                Take control of your finances with AI.
              </h1>

              <p className="mt-6 max-w-md text-lg text-(--muted)">
                Track expenses, manage budgets, analyze spending patterns and
                receive intelligent financial insights.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <Card className="w-full max-w-lg border-(--border) bg-(--surface)/90 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="mb-8 space-y-5">
                  <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-(--secondary)">
                      Secure Access
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      {activeTab === "login"
                        ? "Welcome Back"
                        : "Create Account"}
                    </h2>

                    <p className="max-w-md text-sm leading-6 text-(--muted) sm:text-base">
                      {activeTab === "login"
                        ? "Sign in to continue."
                        : "Create your account to get started."}
                    </p>
                  </div>

                  <TabsList className="h-12 w-full flex grid-cols-2 rounded-xl border border-(--border) bg-(--background)/70 p-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                </div>

                <div className="relative overflow-hidden min-h-105">
                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
                      activeTab === "login"
                        ? "translate-x-0 opacity-100"
                        : "pointer-events-none -translate-x-4 opacity-0"
                    }`}
                  >
                    <LoginForm />
                  </div>

                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
                      activeTab === "register"
                        ? "translate-x-0 opacity-100"
                        : "pointer-events-none translate-x-4 opacity-0"
                    }`}
                  >
                    <RegisterForm onSuccess={() => setActiveTab("login")} />
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
