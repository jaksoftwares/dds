import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientTopbar } from "@/components/client/ClientTopbar";
import { ClientSidebar } from "@/components/client/ClientSidebar";

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || user.user_metadata?.full_name || "Client";

  const isAdmin = profile?.role === "admin";

  return (
    <div className="h-screen bg-slate-50 flex flex-col text-slate-900 overflow-hidden">
      <ClientTopbar clientName={displayName} isAdmin={isAdmin} />
      <div className="flex flex-1 overflow-hidden">
        <ClientSidebar />
        <main className="flex-1 px-4 md:px-8 lg:px-12 py-6 lg:py-10 w-full space-y-8 overflow-y-auto relative">
          {children}
        </main>
      </div>
    </div>
  );
}
