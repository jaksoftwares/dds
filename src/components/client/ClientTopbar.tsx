"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function ClientTopbar({ clientName }: { clientName: string }) {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-bold text-lg text-customBlueExtraDark">
          {SITE_CONFIG.name}
        </span>
        <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600 hidden sm:inline-block">
          Client Portal
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600 hidden sm:inline-block">
          Hello, <strong className="text-slate-900">{clientName}</strong>
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
