"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegBell } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const adminNavItems = [
  { label: "Overview", href: "/admin" },
  { label: "Content", href: "/admin/content" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Settings", href: "/admin/settings" },
];

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r bg-customBlueExtraDark text-white">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-lg font-semibold tracking-tight">
            {SITE_CONFIG.name}
          </h1>
          <p className="mt-1 text-xs text-customBlueBase">
            Admin Control Center
          </p>
        </div>

        <ScrollArea className="flex-1">
          <nav className="px-3 py-4 space-y-1">
            {adminNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors",
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
                          active
                            ? "bg-customBlueExtraDark text-white"
                            : "bg-customOrange text-white"
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
        </ScrollArea>

        <div className="px-4 py-4 border-t border-white/10 text-xs text-customBlueBase space-y-1">
          <p className="font-semibold text-white">Quick Tip</p>
          <p>Use this panel to oversee content, enquiries and updates.</p>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
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
            <Card className="flex items-center gap-2 px-3 py-1.5 bg-customBlueExtraDark text-white border-none shadow-sm">
              <div className="h-7 w-7 rounded-full bg-customBlueBase/10 flex items-center justify-center text-xs font-semibold">
                AD
              </div>
              <div className="flex flex-col">
                <span className="text-xs leading-tight">Administrator</span>
                <span className="text-[10px] text-customBlueBase leading-tight">
                  Full access
                </span>
              </div>
            </Card>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 px-4 md:px-6 py-4 md:py-6 lg:py-8 bg-slate-50 overflow-x-hidden">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
