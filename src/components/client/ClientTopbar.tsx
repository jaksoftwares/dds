"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="h-16 border-b border-t-4 border-t-customOrange bg-white flex items-center justify-between px-4 md:px-8 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <Image 
          src="/core/logo-base.png" 
          alt="DovePeak" 
          width={130} 
          height={40} 
        />
        <span className="text-xs px-2 py-1 bg-orange-50 rounded text-customOrange font-medium hidden sm:inline-block">
          Client Portal
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600 hidden sm:inline-block">
          Hello, <strong className="text-slate-900">{clientName}</strong>
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout} className="border-slate-200 text-slate-600 hover:text-customOrange hover:border-customOrange hover:bg-orange-50 transition-colors">
          Logout
        </Button>
      </div>
    </header>
  );
}
