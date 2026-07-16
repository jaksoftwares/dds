import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ProjectsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <header>
        <div className="h-8 w-48 bg-slate-200 rounded-md mb-2"></div>
        <div className="h-4 w-72 bg-slate-200 rounded-md"></div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-slate-100 shadow-sm h-64">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex justify-between items-start mb-4">
                <div className="h-5 w-1/3 bg-slate-200 rounded"></div>
                <div className="h-5 w-24 bg-slate-200 rounded-full"></div>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full"></div>
            </CardHeader>
            <CardContent className="p-5 md:p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-md shrink-0"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-slate-200 rounded"></div>
                    <div className="h-4 w-48 bg-slate-200 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 bg-slate-200 rounded-md shrink-0"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-slate-200 rounded"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-48 h-12 bg-slate-200 rounded-lg shrink-0"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
