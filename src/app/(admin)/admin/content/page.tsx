import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const contentAreas = [
  {
    title: "Services",
    description:
      "Manage the list of services offered by DovePeak Digital Solutions.",
    stats: "8 services live",
    href: "#services",
  },
  {
    title: "Portfolio projects",
    description:
      "Review and update portfolio entries showcased on the public site.",
    stats: "24 projects published",
    href: "#portfolio",
  },
  {
    title: "News & updates",
    description: "Create and schedule news items and announcements.",
    stats: "12 posts active",
    href: "#news",
  },
];

const AdminContentPage = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Site content
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Configure the content blocks that appear on the public website: services,
          portfolio projects and news items.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {contentAreas.map((area) => (
          <Card
            key={area.title}
            className="p-4 md:p-5 flex flex-col justify-between border-slate-100 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  {area.title}
                </h2>
                <Badge variant="outline" className="text-[10px]">
                  {area.stats}
                </Badge>
              </div>
              <p className="text-xs md:text-sm text-slate-600">
                {area.description}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button size="sm" className="bg-customBlueExtraDark text-white">
                Configure
              </Button>
              <Button size="sm" variant="outline">
                Preview
              </Button>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-5">
          <h2 className="text-sm font-semibold mb-2 text-slate-900">
            Content governance
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            This admin panel focuses on high-level control of the public-facing
            content. Integrate it with your APIs or CMS of choice to make these
            modules fully dynamic.
          </p>
        </Card>

        <Card className="p-4 md:p-5">
          <h2 className="text-sm font-semibold mb-2 text-slate-900">
            Next steps
          </h2>
          <ul className="text-xs md:text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>Connect services and portfolio to your backend or headless CMS.</li>
            <li>Replace placeholder counts with real statistics.</li>
            <li>Extend this area with blog management if required.</li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default AdminContentPage;
