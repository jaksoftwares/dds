"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  CreditCard,
  MessageSquare,
  LifeBuoy,
  MessageCircle,
  Settings
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Start Project", href: "/dashboard/onboarding", icon: FileText },
  { label: "Financials", href: "/dashboard/financials", icon: CreditCard },
  { label: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { label: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { label: "Feedback", href: "/dashboard/feedback", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function ClientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r bg-white text-slate-700">
      <ScrollArea className="flex-1 py-6">
        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200",
                    active
                      ? "bg-orange-50 text-customOrange shadow-sm border border-orange-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-customOrange"
                  )}
                >
                  <Icon className={cn("w-5 h-5", active ? "text-customOrange" : "text-slate-400 group-hover:text-customOrange")} />
                  {item.label}
                  {item.label === "Chat" && (
                    <Badge className="ml-auto bg-customOrange text-white hover:bg-customOrange/90 border-none text-[10px]">
                      New
                    </Badge>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="px-6 py-5 border-t border-slate-100 text-xs text-slate-500 space-y-1 bg-slate-50/50">
        <p className="font-semibold text-slate-700">Need immediate help?</p>
        <p>Call us at +254 114 749 711 or drop a message in Chat.</p>
      </div>
    </aside>
  );
}
