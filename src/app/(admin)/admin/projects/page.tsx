import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderKanban } from "lucide-react";
import Link from "next/link";
import { cn, getProjectStatusColor } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("client_projects")
    .select("*, profiles(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Project Pipeline
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Manage client projects, update progress, and set milestones.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects && projects.length > 0 ? projects.map((project: any) => (
          <Link key={project.id} href={`/admin/projects/${project.id}`} className="block group">
            <Card className="border-slate-200 transition-colors group-hover:border-customBlueBase h-full flex flex-col">
              <CardHeader className="pb-3 bg-slate-50 border-b border-slate-100 rounded-t-xl">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-customBlueExtraDark/10 text-customBlueExtraDark rounded-lg">
                      <FolderKanban className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-slate-800 line-clamp-1">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {project.profiles?.full_name || "Unknown Client"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("capitalize", getProjectStatusColor(project.status))}>
                    {project.status || "active"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">{project.details}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Progress</span>
                    <span>{project.progress_percentage || 0}%</span>
                  </div>
                  <Progress value={project.progress_percentage || 0} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed rounded-xl bg-slate-50">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}
