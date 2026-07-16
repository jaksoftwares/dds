import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video } from "lucide-react";
import Link from "next/link";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch Projects
  const { data: projects } = await supabase
    .from("client_projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch Quotes
  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch Upcoming Meetings
  const { data: upcomingMeetings } = await supabase
    .from("project_meetings")
    .select("*, client_projects(title)")
    .eq("is_published", true)
    .gte("meeting_date", new Date().toISOString())
    .order("meeting_date", { ascending: true })
    .limit(3);

  // Fetch Contact Messages
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-customBlueExtraDark">
            Dashboard
          </h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">
            Track the progress of your projects and view your recent enquiries.
          </p>
        </div>
        <a 
          href="/dashboard/onboarding" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-customOrange text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm w-full md:w-auto"
        >
          Start New Project
        </a>
      </header>

      {/* Upcoming Meetings Section */}
      {upcomingMeetings && upcomingMeetings.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-customBlueBase" />
            Upcoming Meetings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMeetings.map((meeting: any) => (
              <Card key={meeting.id} className="p-5 border-blue-100 bg-blue-50/50 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-blue-900 line-clamp-1" title={meeting.title}>
                      {meeting.title}
                    </h3>
                  </div>
                  <p className="text-sm text-blue-700 font-medium mb-1">
                    {meeting.client_projects?.title}
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    {new Date(meeting.meeting_date).toLocaleString()}
                  </p>
                </div>
                <Link 
                  href={meeting.meeting_link} 
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white border border-blue-200 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors"
                >
                  <Video className="w-4 h-4" />
                  Join Meeting
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Active Projects</h2>
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="p-5 border-slate-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  <Badge variant="outline" className="bg-slate-50">
                    {project.status}
                  </Badge>
                </div>
                {project.details && (
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {project.details}
                  </p>
                )}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Progress</span>
                    <span>{project.progress_percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-customBlueDark rounded-full" 
                      style={{ width: `${project.progress_percentage}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-slate-500 border-dashed bg-transparent">
            No active projects found. When we start a project for you, it will appear here.
          </Card>
        )}
      </section>

      {/* Enquiries Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Recent Quotes</h2>
          {quotes && quotes.length > 0 ? (
            <div className="space-y-3">
              {quotes.map((quote) => (
                <Card key={quote.id} className="p-4 flex flex-col gap-2 border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Service Request: {quote.service || quote.reason}</span>
                    <Badge variant={quote.status === "pending" ? "default" : "secondary"}>
                      {quote.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{quote.message}</p>
                  <span className="text-[10px] text-slate-400">
                    {new Date(quote.created_at).toLocaleDateString()}
                  </span>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No quotes requested yet.</p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Contact Messages</h2>
          {messages && messages.length > 0 ? (
            <div className="space-y-3">
              {messages.map((msg) => (
                <Card key={msg.id} className="p-4 flex flex-col gap-2 border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Message Sent</span>
                    <Badge variant={msg.status === "unread" ? "default" : "secondary"}>
                      {msg.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                  <span className="text-[10px] text-slate-400">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No contact messages sent.</p>
          )}
        </div>
      </section>
    </div>
  );
}
