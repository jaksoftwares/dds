"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const adminNavItems = [
  { label: "Overview", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Content", href: "/admin/content" },
  { label: "Financials", href: "/admin/financials" },
  { label: "Enquiries", href: "/admin/messages" },
  { label: "Support", href: "/admin/support" },
  { label: "Chat", href: "/admin/chat" },
  { label: "Feedback", href: "/admin/feedback" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r bg-customBlueExtraDark text-white">
      <div className="px-6 py-6 border-b border-white/10">
        <Image 
          src="/core/logo-base-grayscale.png" 
          alt="DovePeak Admin" 
          width={130} 
          height={40} 
        />
        <p className="mt-1 text-xs text-customBlueBase">
          Admin Control Center
        </p>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-3 py-4 space-y-1">
          {adminNavItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors",
                    active
                      ? "bg-white text-customBlueExtraDark"
                      : "text-customBlueBase hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                  {item.label === "Messages" && (
                    <Badge
                      className={cn(
                        "ml-auto text-[10px] font-semibold",
                        active
                          ? "bg-customBlueExtraDark text-white"
                          : "bg-customOrange text-white"
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
