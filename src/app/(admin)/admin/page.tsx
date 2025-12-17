import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const stats = [
  { label: "Active Services", value: 8, tone: "bg-emerald-50 text-emerald-700" },
  { label: "Projects Delivered", value: 24, tone: "bg-sky-50 text-sky-700" },
  { label: "Open Enquiries", value: 5, tone: "bg-amber-50 text-amber-700" },
  { label: "Published News", value: 12, tone: "bg-violet-50 text-violet-700" },
];

const recentActivity = [
  {
    area: "Contact enquiries",
    action: "New message received",
    status: "Unread",
    time: "2 mins ago",
  },
  {
    area: "Portfolio",
    action: "Project 'Kids Beyond Limit' updated",
    status: "Published",
    time: "1 hour ago",
  },
  {
    area: "News",
    action: "Scheduled article for next week",
    status: "Scheduled",
    time: "Yesterday",
  },
];

const quickLinks = [
  { label: "Manage services", href: "/admin/content" },
  { label: "Review enquiries", href: "/admin/messages" },
  { label: "Update site details", href: "/admin/settings" },
];

const AdminDashboardPage = () => {
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
              Recent activity
            </h2>
            <Badge className="bg-customBlueExtraDark text-white">Live</Badge>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, index) => (
              <div
                key={`${item.area}-${index}`}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-100 px-3 py-2 text-xs md:text-sm"
              >
                <div className="space-y-0.5">
                  <p className="font-medium text-slate-800">{item.area}</p>
                  <p className="text-slate-500">{item.action}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="text-[10px]">
                    {item.status}
                  </Badge>
                  <p className="text-[10px] text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
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
                  <a href={link.href}>
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-500">Go</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
