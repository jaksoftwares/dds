import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  // Fetch Contact Messages
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-customBlueExtraDark">
          Dashboard
        </h1>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Track the progress of your projects and view your recent enquiries.
        </p>
      </header>

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
