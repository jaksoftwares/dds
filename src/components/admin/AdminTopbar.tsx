"use client";

import React from "react";
import { FaRegBell } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AdminTopbar({ adminName }: { adminName: string }) {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-slate-500">
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
