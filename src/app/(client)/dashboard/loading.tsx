import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded-md mb-2"></div>
          <div className="h-4 w-72 bg-slate-200 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Stats/Widgets Skeleton */}
      <section className="space-y-4">
        <div className="h-6 w-48 bg-slate-200 rounded-md"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-5 border-slate-100 shadow-sm h-36">
              <div className="h-4 w-2/3 bg-slate-200 rounded mb-4"></div>
              <div className="h-3 w-1/2 bg-slate-200 rounded mb-2"></div>
              <div className="h-3 w-1/3 bg-slate-200 rounded mb-4"></div>
              <div className="h-8 w-full bg-slate-200 rounded"></div>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Grid Skeleton */}
      <section className="space-y-4">
        <div className="h-6 w-32 bg-slate-200 rounded-md"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="border-slate-100 shadow-sm h-64">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-5 w-1/2 bg-slate-200 rounded"></div>
                  <div className="h-5 w-16 bg-slate-200 rounded-full"></div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full"></div>
              </CardHeader>
              <CardContent className="p-5 md:p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="h-10 w-full bg-slate-200 rounded"></div>
                  <div className="h-10 w-full bg-slate-200 rounded"></div>
                </div>
                <div className="w-full sm:w-32 h-10 bg-slate-200 rounded-lg shrink-0"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
