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

export function ClientTopbar({ clientName }: { clientName: string }) {
  const supabase = createClient();
  const router = useRouter();

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
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-[130px] h-[34px] transition-transform duration-200 group-hover:scale-[1.02]">
          <Image 
            src="/core/logo-base.png" 
            alt="DovePeak" 
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <div className="h-5 w-px bg-slate-200 hidden sm:block mx-1"></div>
        <span className="text-[11px] px-2.5 py-1 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-full text-customOrange font-semibold hidden sm:inline-block border border-orange-100 shadow-sm uppercase tracking-wider">
          Client Portal
        </span>
      </Link>

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
