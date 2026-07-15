import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, PlayCircle, ExternalLink, FolderKanban } from "lucide-react";
import Link from "next/link";

export default async function ClientProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch Projects with their milestones
  const { data: projects } = await supabase
    .from("client_projects")
    .select(`
      *,
      project_milestones (*)
    `)
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          My Projects
        </h1>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Track the progress, milestones, and preview links for your ongoing projects.
        </p>
      </header>

      {projects && projects.length > 0 ? (
        <div className="space-y-6">
          {projects.map((project) => (
            <Card key={project.id} className="border-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <CardTitle className="text-xl text-slate-800">{project.title}</CardTitle>
                    {project.details && (
                      <CardDescription className="mt-2 text-slate-600 max-w-2xl">
                        {project.details}
                      </CardDescription>
                    )}
                  </div>
                  <Badge variant={project.status === "completed" ? "default" : "outline"} className={project.status === "completed" ? "bg-green-600" : "bg-white"}>
                    {project.status || "In Progress"}
                  </Badge>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm font-medium text-slate-700">
                    <span>Overall Progress</span>
                    <span>{project.progress_percentage || 0}%</span>
                  </div>
                  <Progress value={project.progress_percentage || 0} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {project.project_milestones && project.project_milestones.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {project.project_milestones
                      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                      .map((milestone: any) => (
                        <div key={milestone.id} className="p-4 md:p-6 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className="mt-1">
                              {milestone.status === 'completed' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : milestone.status === 'in_progress' ? (
                                <PlayCircle className="w-5 h-5 text-customOrange" />
                              ) : (
                                <Clock className="w-5 h-5 text-slate-300" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-800">{milestone.title}</h4>
                              {milestone.description && (
                                <p className="text-sm text-slate-500 mt-1">{milestone.description}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Badge variant="secondary" className="capitalize shrink-0">
                              {milestone.status.replace("_", " ")}
                            </Badge>
                            {milestone.preview_url && (
                              <Link 
                                href={milestone.preview_url} 
                                target="_blank"
                                className="flex items-center gap-1.5 text-xs font-medium text-customOrange hover:text-customOrange/80 bg-orange-50 px-3 py-1.5 rounded-full transition-colors shrink-0"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Preview
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No milestones defined for this project yet.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center text-slate-500 border-dashed bg-transparent flex flex-col items-center gap-4">
          <FolderKanban className="w-12 h-12 text-slate-300" />
          <p>You don't have any active projects right now.</p>
          <Link href="/dashboard/onboarding" className="text-customOrange hover:underline text-sm font-medium">
            Start a new project
          </Link>
        </Card>
      )}
    </div>
  );
}
