import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard"); // Unauthorized users go back to client dashboard
  }

  return (
    <div className="h-screen bg-slate-50 flex text-slate-900 overflow-hidden">
      {/* Sidebar (Client Component) */}
      <AdminSidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top bar (Client Component) */}
        <AdminTopbar adminName={profile?.full_name || "Admin"} />

        {/* Content area */}
        <main className="flex-1 px-4 md:px-6 py-4 md:py-6 lg:py-8 bg-slate-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
