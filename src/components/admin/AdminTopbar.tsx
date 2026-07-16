"use client";

import React from "react";
import { FaRegBell } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SiteLogo from "@/components/core/SiteLogo";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  LayoutDashboard,
  FolderKanban,
  FileText,
  CreditCard,
  MessageSquare,
  LifeBuoy,
  MessageCircle,
  Settings,
  LogOut,
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

export function AdminTopbar({ adminName }: { adminName: string }) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const initials = adminName
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
          <SheetContent side="left" className="w-[280px] p-0 bg-customBlueExtraDark text-white border-r-0">
            <div className="flex flex-col h-full">
              <div className="px-6 py-6 border-b border-white/10 flex flex-col">
                <SiteLogo width={130} height={40} className="brightness-0 invert opacity-90" />
                <p className="mt-1 text-xs text-customBlueBase">Admin Control Center</p>
              </div>
              <div className="flex-1 py-4 overflow-y-auto">
                <nav className="px-3 space-y-1">
                  {adminNavItems.map((item) => {
                    const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <span
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
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
                                active ? "bg-white text-customBlueExtraDark hover:bg-white/90" : "bg-customOrange text-white hover:bg-customOrange/90"
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

        <div className="flex items-center gap-3 group">
          <span className="text-sm md:text-base font-semibold truncate text-customBlueDark">
            {SITE_CONFIG.name}
          </span>
          <div className="h-5 w-px bg-slate-200 hidden sm:block mx-1"></div>
          <span className="text-[11px] px-2.5 py-1 bg-customBlueExtraDark/5 rounded-full text-customBlueExtraDark font-semibold hidden sm:inline-block border border-customBlueExtraDark/10 shadow-sm uppercase tracking-wider">
            Admin Dashboard
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <FaRegBell className="h-4 w-4 text-slate-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none focus:ring-2 focus:ring-customBlueBase focus:ring-offset-2 rounded-full p-1 pr-3 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
            <Avatar className="h-9 w-9 border border-slate-200 shadow-sm">
              <AvatarFallback className="bg-customBlueExtraDark text-white font-medium">
                {initials || "AD"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-sm font-semibold text-slate-800 leading-none">{adminName}</span>
              <span className="text-[11px] text-slate-500 mt-1 leading-none">Admin Account</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl border-slate-200 shadow-lg">
            <DropdownMenuLabel className="font-normal px-3 py-2.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-slate-800">{adminName}</p>
                <p className="text-xs leading-none text-slate-500">
                  Administrator
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer px-3 py-2.5">
              <Link href="/admin/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4 text-slate-500" />
                <span>Admin Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer px-3 py-2.5">
              <Link href="/dashboard" className="flex items-center w-full text-customOrange font-medium">
                <LayoutDashboard className="mr-2 h-4 w-4 text-customOrange" />
                <span>Go to Client Panel</span>
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
