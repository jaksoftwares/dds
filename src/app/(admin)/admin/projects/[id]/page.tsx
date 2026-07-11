import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderKanban, ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddMilestoneModal, EditProjectModal } from "./ProjectModals";

export default async function AdminProjectDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("client_projects")
    .select("*, profiles(full_name, email), project_milestones(*)")
    .eq("id", params.id)
    .single();

  if (!project) return <div>Project not found</div>;

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-4">
        <Link href="/admin/projects" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-customBlueExtraDark transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
              {project.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Client: {project.profiles?.full_name} ({project.profiles?.email})
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-sm">
            {project.status || "active"}
          </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-lg text-slate-800">Milestones</CardTitle>
                <CardDescription>Pipeline of tasks for this project</CardDescription>
              </div>
              <AddMilestoneModal projectId={project.id} />
            </CardHeader>
            <CardContent className="p-0">
              {project.project_milestones && project.project_milestones.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {project.project_milestones
                    .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                    .map((milestone: any) => (
                      <div key={milestone.id} className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-slate-800">{milestone.title}</h4>
                          {milestone.description && (
                            <p className="text-sm text-slate-500 mt-1">{milestone.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="capitalize">
                            {milestone.status.replace("_", " ")}
                          </Badge>
                          {milestone.preview_url && (
                            <Link href={milestone.preview_url} target="_blank" className="text-xs font-medium text-customBlueBase hover:underline">
                              Preview Link
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-500">
                  No milestones added yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Progress</label>
                <div className="flex justify-between text-sm font-medium text-slate-900 mt-2 mb-1">
                  <span>{project.progress_percentage || 0}%</span>
                </div>
                <Progress value={project.progress_percentage || 0} className="h-2" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</label>
                <p className="text-sm text-slate-700 mt-1">{project.details}</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <EditProjectModal project={project} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
