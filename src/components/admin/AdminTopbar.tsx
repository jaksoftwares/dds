"use client";

import React from "react";
import { FaRegBell } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SiteLogo from "@/components/core/SiteLogo";

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

export function AdminTopbar({ adminName }: { adminName: string }) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 min-w-0">
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 bg-customBlueExtraDark text-white border-r-0">
            <div className="flex flex-col h-full">
              <div className="px-6 py-6 border-b border-white/10">
                <SiteLogo width={130} height={40} />
                <p className="mt-1 text-xs text-customBlueBase">Admin Control Center</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <nav className="px-3 py-4 space-y-1">
                  {adminNavItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href}>
                        <span
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
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
                                active ? "bg-customBlueExtraDark text-white" : "bg-customOrange text-white"
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
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-slate-500 hidden sm:block">
            Admin Dashboard
          </span>
          <span className="text-sm md:text-base font-semibold truncate text-customBlueDark">
            {SITE_CONFIG.name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full border-slate-200"
        >
          <FaRegBell className="h-4 w-4" />
        </Button>
        <Card className="flex items-center gap-2 px-3 py-1.5 bg-customBlueExtraDark text-white border-none shadow-sm cursor-pointer" onClick={handleLogout}>
          <div className="h-7 w-7 rounded-full bg-customBlueBase/10 flex items-center justify-center text-xs font-semibold uppercase">
            {adminName.substring(0, 2)}
          </div>
          <div className="flex flex-col hidden md:flex">
            <span className="text-xs leading-tight">{adminName}</span>
            <span className="text-[10px] text-customBlueBase leading-tight">
              Logout
            </span>
          </div>
        </Card>
      </div>
    </header>
  );
}
