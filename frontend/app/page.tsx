import Link from "next/link";
import { ArrowRight, Wallet, Target, Receipt, Bot } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Lumina Finance</h1>

            <p className="text-xs text-slate-400">AI Powered Finance Manager</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/auth"
              className="rounded-lg border border-slate-700 px-5 py-2 text-sm hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              href="/auth"
              className="rounded-lg bg-[#2E62FF] px-5 py-2 text-sm font-medium hover:bg-[#2554e8]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="rounded-full border border-[#2E62FF]/30 bg-[#2E62FF]/10 px-4 py-2 text-sm text-[#2E62FF]">
          AI-Powered Personal Finance Management
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Manage Your Money
          <span className="text-[#2E62FF]"> Smarter </span>
          With AI
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Track expenses, manage budgets, monitor financial goals, scan
          receipts, and get AI-powered financial insights all in one place.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/auth"
            className="flex items-center gap-2 rounded-xl bg-[#2E62FF] px-8 py-4 font-semibold transition hover:bg-[#2554e8]"
          >
            Start Managing
            <ArrowRight size={18} />
          </Link>

          <Link
            href="#features"
            className="rounded-xl border border-slate-700 px-8 py-4 font-semibold hover:bg-slate-800"
          >
            Explore Features
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Everything You Need</h2>

          <p className="mt-4 text-slate-400">
            Powerful tools for complete financial control.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-[#111C3D] p-6">
            <Wallet className="mb-4 h-10 w-10 text-[#2E62FF]" />

            <h3 className="text-xl font-semibold">Expense Tracking</h3>

            <p className="mt-3 text-slate-400">
              Track every transaction and understand your spending habits.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111C3D] p-6">
            <Target className="mb-4 h-10 w-10 text-[#10B981]" />

            <h3 className="text-xl font-semibold">Financial Goals</h3>

            <p className="mt-3 text-slate-400">
              Create savings goals and monitor progress toward your targets.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111C3D] p-6">
            <Receipt className="mb-4 h-10 w-10 text-[#F59E0B]" />

            <h3 className="text-xl font-semibold">Receipt Scanner</h3>

            <p className="mt-3 text-slate-400">
              Upload receipts and automatically extract expense information.
              <br/>
              <span className="font-bold text-2xl">(Under Process)</span>
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111C3D] p-6">
            <Bot className="mb-4 h-10 w-10 text-[#8B5CF6]" />

            <h3 className="text-xl font-semibold">AI Assistant</h3>

            <p className="mt-3 text-slate-400">
              Ask questions about spending, budgets, and receive smart financial
              insights.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Take Control of Your Finances?
          </h2>

          <p className="mt-4 text-slate-400">
            Join Lumina Finance and make smarter financial decisions today.
          </p>

          <Link
            href="/auth"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#2E62FF] px-8 py-4 font-semibold hover:bg-[#2554e8]"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
