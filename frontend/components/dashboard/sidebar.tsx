"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  WalletCards,
  Receipt,
  Target,
  MessageSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: WalletCards,
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: Receipt,
  },
  {
    label: "Financial Goals",
    href: "/goals",
    icon: Target,
  },
  {
    label: "Chat Assistant",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-[#111C3D] p-2 text-white lg:hidden"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex min-h-screen w-64 flex-col border-r border-slate-800 bg-[#07112B] transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0",
        )}
      >
        {/* Mobile Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-slate-400 lg:hidden"
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="px-6 pt-6 pb-8">
          <h1 className="text-3xl font-bold text-[#E2E8F0]">Lumina Finance</h1>

          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
            AI-Powered Insights
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all",
                    active
                      ? "border border-[#5C6BC0] bg-[#1B2548] text-white shadow-sm"
                      : "text-slate-300 hover:bg-[#111B3D] hover:text-white",
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(active ? "text-[#C7D2FE]" : "text-slate-400")}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
