"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, LifeBuoy } from "lucide-react";
import SiteLogo from "@/components/core/SiteLogo";
import {
  Menu,
  LayoutDashboard,
  FolderKanban,
  FileText,
  CreditCard,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

export function ClientTopbar({ clientName, isAdmin = false }: { clientName: string, isAdmin?: boolean }) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const initials = clientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors mr-1">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 bg-white border-r">
            <div className="flex flex-col h-full">
              <div className="px-6 py-6 border-b border-slate-100 flex items-center gap-3">
                <SiteLogo width={110} height={30} className="object-contain" />
              </div>
              <div className="flex-1 py-6 overflow-y-auto">
                <nav className="px-4 space-y-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <span
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                            active
                              ? "bg-orange-50 text-customOrange shadow-sm border border-orange-100"
                              : "text-slate-600 hover:bg-slate-50 hover:text-customOrange"
                          )}
                        >
                          <Icon className={cn("w-5 h-5", active ? "text-customOrange" : "text-slate-400 group-hover:text-customOrange")} />
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-3 group">
          <SiteLogo width={130} height={34} className="w-[110px] md:w-[130px] transition-transform duration-200 group-hover:scale-[1.02] object-contain object-left" />
        <div className="h-5 w-px bg-slate-200 hidden sm:block mx-1"></div>
        <span className="text-[11px] px-2.5 py-1 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-full text-customOrange font-semibold hidden sm:inline-block border border-orange-100 shadow-sm uppercase tracking-wider">
          Client Portal
        </span>
      </Link>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none focus:ring-2 focus:ring-customOrange focus:ring-offset-2 rounded-full p-1 pr-3 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
            <Avatar className="h-9 w-9 border border-slate-200 shadow-sm">
              <AvatarFallback className="bg-customOrange text-white font-medium">
                {initials || "C"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-sm font-semibold text-slate-800 leading-none">{clientName}</span>
              <span className="text-[11px] text-slate-500 mt-1 leading-none">Manage Account</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl border-slate-200 shadow-lg">
            <DropdownMenuLabel className="font-normal px-3 py-2.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-slate-800">{clientName}</p>
                <p className="text-xs leading-none text-slate-500">
                  Client Account
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isAdmin && (
              <>
                <DropdownMenuItem asChild className="cursor-pointer px-3 py-2.5 bg-blue-50/50 hover:bg-blue-100/50 focus:bg-blue-100/50">
                  <Link href="/admin" className="flex items-center w-full font-medium text-customBlueDark">
                    <Settings className="mr-2 h-4 w-4 text-customBlueDark" />
                    <span>Go to Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild className="cursor-pointer px-3 py-2.5">
              <Link href="/dashboard/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4 text-slate-500" />
                <span>Profile Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer px-3 py-2.5">
              <Link href="/dashboard/support" className="flex items-center w-full">
                <LifeBuoy className="mr-2 h-4 w-4 text-slate-500" />
                <span>Support Center</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 px-3 py-2.5">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
