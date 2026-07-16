"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import SiteLogo from "@/components/core/SiteLogo";

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

const adminNavItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Financials", href: "/admin/financials", icon: CreditCard },
  { label: "Enquiries", href: "/admin/messages", icon: MessageSquare },
  { label: "Support", href: "/admin/support", icon: LifeBuoy },
  { label: "Chat", href: "/admin/chat", icon: MessageCircle },
  { label: "Feedback", href: "/admin/feedback", icon: MessageCircle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r bg-customBlueExtraDark text-white">
      <div className="px-6 py-6 border-b border-white/10">
        <SiteLogo width={130} height={40} className="brightness-0 invert opacity-90" />
        <p className="mt-1 text-xs text-customBlueBase">
          Admin Control Center
        </p>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-3 py-4 space-y-1">
          {adminNavItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-all duration-200",
                    active
                      ? "bg-white/10 text-white border border-white/5 shadow-sm"
                      : "text-customBlueBase hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className={cn("w-5 h-5", active ? "text-white" : "text-customBlueBase/70")} />
                  {item.label}
                  {item.label === "Enquiries" && (
                    <Badge
                      className={cn(
                        "ml-auto text-[10px] font-semibold border-none",
                        active
                          ? "bg-white text-customBlueExtraDark hover:bg-white/90"
                          : "bg-customOrange text-white hover:bg-customOrange/90"
                      )}
                    >
                      Live
                    </Badge>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="px-4 py-4 border-t border-white/10 text-xs text-customBlueBase space-y-1">
        <p className="font-semibold text-white">Quick Tip</p>
        <p>Use this panel to oversee content, enquiries and updates.</p>
      </div>
    </aside>
  );
}
