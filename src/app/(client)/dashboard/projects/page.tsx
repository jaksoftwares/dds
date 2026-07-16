import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, PlayCircle, ExternalLink, FolderKanban, Calendar } from "lucide-react";
import Link from "next/link";
import { cn, getProjectStatusColor, getMilestoneStatusColor, sortMilestonesByDueDate } from "@/lib/utils";

export default async function ClientProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch Projects with their milestones and meetings
  const { data: projects } = await supabase
    .from("client_projects")
    .select(`
      *,
      project_milestones (*),
      project_meetings (*)
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
                  <Badge variant="outline" className={cn("capitalize", getProjectStatusColor(project.status))}>
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
              
              <CardContent className="p-5 md:p-6 bg-white flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div className="flex-1 space-y-3 w-full">
                  {/* Next Milestone Summary */}
                  {(() => {
                    const milestones = (project.project_milestones || []).sort(sortMilestonesByDueDate);
                    const nextMilestone = milestones.find((m: any) => m.status === 'in_progress') || milestones.find((m: any) => m.status === 'pending');
                    
                    return nextMilestone ? (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-orange-50 text-customOrange rounded-md shrink-0">
                          <PlayCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Current Focus</p>
                          <p className="font-semibold text-slate-800">{nextMilestone.title}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <div className="p-2 bg-slate-50 text-slate-400 rounded-md shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <p>All milestones completed or pending setup.</p>
                      </div>
                    );
                  })()}

                  {/* Next Meeting Summary */}
                  {(() => {
                    const meetings = project.project_meetings || [];
                    const nextMeeting = meetings
                      .filter((m: any) => m.status === 'scheduled' && new Date(m.meeting_date) >= new Date())
                      .sort((a: any, b: any) => new Date(a.meeting_date).getTime() - new Date(b.meeting_date).getTime())[0];
                    
                    return nextMeeting && (
                      <div className="flex items-center gap-3 text-sm mt-3 pt-3 border-t border-slate-100">
                        <div className="p-2 bg-blue-50 text-customBlueBase rounded-md shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Next Meeting</p>
                          <p className="font-semibold text-slate-800">{new Date(nextMeeting.meeting_date).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  <Link 
                    href={`/dashboard/projects/${project.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-customBlueExtraDark text-white text-sm font-medium rounded-lg hover:bg-customBlueDark transition-colors shadow-sm"
                  >
                    View Project Workspace
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
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
