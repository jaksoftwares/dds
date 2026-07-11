import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Parallel data fetching for performance
  const [
    { count: unreadMessagesCount },
    { count: pendingQuotesCount },
    { count: activeServicesCount },
    { count: publishedPortfolioCount },
    { data: recentMessages },
    { data: recentQuotes },
  ] = await Promise.all([
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("services").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("portfolio").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(3),
    supabase.from("quotes").select("*").order("created_at", { ascending: false }).limit(3),
  ]);

  const stats = [
    { label: "Active Services", value: activeServicesCount || 0, tone: "bg-emerald-50 text-emerald-700" },
    { label: "Published Projects", value: publishedPortfolioCount || 0, tone: "bg-sky-50 text-sky-700" },
    { label: "Unread Messages", value: unreadMessagesCount || 0, tone: "bg-amber-50 text-amber-700" },
    { label: "Pending Quotes", value: pendingQuotesCount || 0, tone: "bg-violet-50 text-violet-700" },
  ];

  const quickLinks = [
    { label: "Manage Services", href: "/admin/content" },
    { label: "Review Enquiries", href: "/admin/messages" },
    { label: "Client Projects", href: "/admin/clients" },
  ];

  // Combine recent activity
  const combinedActivity = [
    ...(recentMessages || []).map((m) => ({
      type: "Message",
      name: m.from_name,
      status: m.status,
      date: new Date(m.created_at).toLocaleDateString(),
    })),
    ...(recentQuotes || []).map((q) => ({
      type: "Quote Request",
      name: q.name,
      status: q.status,
      date: new Date(q.created_at).toLocaleDateString(),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Welcome back, Admin
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Monitor everything happening on {SITE_CONFIG.name} from this central
          dashboard: services, portfolio, news, enquiries and more.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((item) => (
          <Card
            key={item.label}
            className={`p-4 md:p-5 border-none shadow-sm ${item.tone}`}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-2xl md:text-3xl font-semibold">
              {item.value}
            </p>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Recent Activity
            </h2>
            <Badge className="bg-customBlueExtraDark text-white">Live</Badge>
          </div>
          
          {combinedActivity.length > 0 ? (
            <div className="space-y-3">
              {combinedActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-md border border-slate-100 px-3 py-2 text-xs md:text-sm"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-slate-500">{item.type}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {item.status.replace("_", " ")}
                    </Badge>
                    <p className="text-[10px] text-slate-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 border border-dashed rounded-lg">
              No recent activity found.
            </div>
          )}
        </Card>

        <Card className="p-4 md:p-5 flex flex-col justify-between bg-customBlueDark text-white">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Quick actions</h2>
            <p className="text-xs text-customBlueBase">
              Jump straight into the areas you manage most frequently.
            </p>
            <div className="space-y-2 mt-2">
              {quickLinks.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  size="sm"
                  className="w-full justify-between bg-white text-customBlueExtraDark hover:bg-slate-100"
                >
                  <Link href={link.href}>
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-500">Go</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
