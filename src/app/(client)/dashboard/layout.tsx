import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientTopbar } from "@/components/client/ClientTopbar";

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <ClientTopbar clientName={profile?.full_name || "Client"} />
      <main className="flex-1 px-4 md:px-6 py-6 lg:py-10 max-w-7xl mx-auto w-full space-y-8">
        {children}
      </main>
    </div>
  );
}
