"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  WalletCards,
  Receipt,
  Target,
  MessageSquare,
  Settings,
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

  return (
    <aside className="flex min-h-screen w-65 flex-col border-r border-slate-800 bg-[#07112B]">
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
  );
}
