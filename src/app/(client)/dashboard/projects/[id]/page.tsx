"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/shared/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { addProjectCommunication } from "@/actions/project-actions";
import { Calendar, Video, ExternalLink, FileText, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { sortMilestonesByDueDate } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";

export default function ClientProjectDetailsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [financials, setFinancials] = useState<any[]>([]);
  const [communications, setCommunications] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      // Fetch Project + Brief
      const { data: projData } = await supabase
        .from("client_projects")
        .select("*, project_briefs(*)")
        .eq("id", params.id)
        .single();
      
      setProject(projData);

      // Fetch Assets
      const { data: assetData } = await supabase.from("project_assets").select("*").eq("project_id", params.id);
      setAssets(assetData || []);

      // Fetch Financials
      const { data: finData } = await supabase.from("project_financials").select("*").eq("project_id", params.id);
      setFinancials(finData || []);

      // Fetch Comms
      const { data: commsData } = await supabase.from("project_communications").select("*").eq("project_id", params.id).order("created_at", { ascending: true });
      setCommunications(commsData || []);

      // Fetch Milestones
      const { data: milestoneData } = await supabase.from("project_milestones").select("*").eq("project_id", params.id).order("created_at", { ascending: true });
      setMilestones(milestoneData || []);

      // Fetch Meetings
      const { data: meetingData } = await supabase.from("project_meetings").select("*").eq("project_id", params.id).order("meeting_date", { ascending: true });
      setMeetings(meetingData || []);
    };

    fetchProjectDetails();
  }, [params.id, supabase]);

  const handleUploadAsset = async (file_url: string, file_name: string, file_type: string) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data, error } = await supabase.from("project_assets").insert({
      project_id: params.id,
      client_id: userData.user.id,
      file_url,
      file_name,
      file_type,
      uploaded_by: userData.user.id
    }).select().single();

    if (error) {
      toast.error(error.message);
    } else {
      setAssets(prev => [...prev, data]);
    }
  };

  const [sending, setSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await addProjectCommunication(params.id, newMessage);
      setNewMessage("");
      // refetch comms
      const { data: commsData } = await supabase.from("project_communications").select("*").eq("project_id", params.id).order("created_at", { ascending: true });
      setCommunications(commsData || []);
    } catch (error: any) {
      toast.error("Failed to send message: " + error.message);
    } finally {
      setSending(false);
    }
  };

  if (!project) return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-10 w-1/3 bg-slate-200 animate-pulse rounded-md"></div>
        <div className="h-5 w-1/4 bg-slate-200 animate-pulse rounded-md"></div>
      </div>
      <div className="h-12 w-full bg-slate-200 animate-pulse rounded-md mb-6"></div>
      <div className="space-y-6">
        <div className="h-48 w-full bg-slate-200 animate-pulse rounded-xl"></div>
        <div className="h-64 w-full bg-slate-200 animate-pulse rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground">Status: <span className="font-semibold text-primary">{project.status}</span></p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview Hub</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="assets">Files & Assets</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Upcoming Meetings Hub */}
          {(() => {
            const upcomingMeetings = meetings.filter(m => new Date(m.meeting_date) >= new Date() && m.status === 'scheduled');
            if (upcomingMeetings.length === 0) return null;
            return (
              <Card className="border-blue-100 bg-blue-50/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-900 flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-customBlueBase" />
                    Upcoming Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingMeetings.map(meeting => {
                      const meetingTime = new Date(meeting.meeting_date).getTime();
                      const now = new Date().getTime();
                      const thirtyMinsInMs = 30 * 60 * 1000;
                      const canJoin = meetingTime - now <= thirtyMinsInMs;

                      return (
                        <div key={meeting.id} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-1">{meeting.title}</h4>
                            <p className="text-xs text-slate-500 mb-4">{new Date(meeting.meeting_date).toLocaleString()}</p>
                          </div>
                          {canJoin ? (
                            <a 
                              href={meeting.meeting_link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-customBlueExtraDark text-white text-xs font-medium rounded hover:bg-customBlueDark transition-colors"
                            >
                              <Video className="w-4 h-4" />
                              Join Meeting
                            </a>
                          ) : (
                            <button 
                              disabled
                              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-slate-100 text-slate-400 text-xs font-medium rounded cursor-not-allowed"
                            >
                              <Video className="w-4 h-4 opacity-50" />
                              Opens 30m before
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Milestone Stepper */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-end">
                <span>Project Timeline & Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const publishedMilestones = milestones
                  .filter(m => m.is_published)
                  .sort(sortMilestonesByDueDate);
                const completedMilestones = publishedMilestones.filter(m => m.status === 'completed');
                const progressPercent = publishedMilestones.length > 0 ? Math.round((completedMilestones.length / publishedMilestones.length) * 100) : 0;
                
                return publishedMilestones.length === 0 ? <p className="text-muted-foreground text-sm">Timeline is being set up by your project manager.</p> : (
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium text-slate-600">
                        <span>Overall Progress</span>
                        <span className="text-slate-800">{progressPercent}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2.5" />
                    </div>
                    
                    <div className="overflow-x-auto pb-6 custom-scrollbar">
                      <div className="min-w-[800px] flex items-center justify-between relative mt-8 px-4">
                        {/* Connecting Line */}
                        <div className="absolute top-5 left-4 right-4 h-1 bg-slate-100 z-0" />
                        <div 
                          className="absolute top-5 left-4 h-1 bg-customBlueBase z-0 transition-all duration-500" 
                          style={{ width: `calc(${progressPercent}% - 2rem)` }} 
                        />
                        
                        {/* Nodes */}
                        {publishedMilestones.map((milestone, index) => (
                          <div key={milestone.id} className="relative z-10 flex flex-col items-center group w-24 shrink-0">
                            <div className={`w-8 h-8 rounded-full border-[3px] border-white shrink-0 shadow-sm transition-all duration-300 ${milestone.status === 'completed' ? 'bg-green-500 ring-2 ring-green-200' : milestone.status === 'in_progress' ? 'bg-orange-500 ring-4 ring-orange-200 animate-pulse' : 'bg-slate-200'}`} />
                            
                            <div className="mt-3 text-center">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Step {index + 1}</p>
                              <h4 className="text-xs font-semibold text-slate-700 leading-tight line-clamp-2">{milestone.title}</h4>
                            </div>
                            
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full mb-4 w-56 p-3 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl pointer-events-none z-50">
                              <p className="font-semibold mb-1">{milestone.title}</p>
                              <p className="text-slate-300 mb-2">{milestone.description || "No description provided."}</p>
                              <div className="flex justify-between items-center border-t border-slate-700 pt-2 mt-2">
                                <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${milestone.status === 'completed' ? 'bg-green-500/20 text-green-300' : milestone.status === 'in_progress' ? 'bg-orange-500/20 text-orange-300' : 'bg-slate-700 text-slate-300'}`}>
                                  {milestone.status.replace('_', ' ')}
                                </span>
                                {milestone.due_date && <span className="text-[9px] text-slate-400">Due: {new Date(milestone.due_date).toLocaleDateString()}</span>}
                              </div>
                              {/* Document Link inside tooltip */}
                              {milestone.report_file_url && (
                                <div className="mt-2 text-[10px] text-blue-300 flex items-center gap-1">
                                  <FileText className="w-3 h-3" /> Report Available
                                </div>
                              )}
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.project_briefs && project.project_briefs.length > 0 ? (
                <>
                  <div>
                    <h4 className="font-semibold text-slate-700">Company</h4>
                    <p className="text-slate-600">{project.project_briefs[0].company_name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">Goals</h4>
                    <div 
                      className="text-sm ql-editor px-0 text-slate-600" 
                      dangerouslySetInnerHTML={{ __html: project.project_briefs[0].project_goals }} 
                    />
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-sm">No brief found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle>Financial Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {financials.length === 0 ? <p>No financial records yet.</p> : (
                <ul className="space-y-4">
                  {financials.map(fin => (
                    <li key={fin.id} className="p-4 border rounded-md">
                      <div className="flex justify-between">
                        <span className="font-semibold capitalize">{fin.type.replace('_', ' ')}</span>
                        <span>${fin.amount}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{fin.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Status: {fin.status}</p>
                      {fin.file_url && <a href={fin.file_url} target="_blank" className="text-blue-500 text-sm hover:underline mt-1 block">View Document</a>}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Project Assets & Files</CardTitle>
              <FileUpload onUploadSuccess={handleUploadAsset} />
            </CardHeader>
            <CardContent>
              {assets.length === 0 ? <p>No assets uploaded yet.</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map(asset => (
                    <div key={asset.id} className="p-4 border rounded-md">
                      <p className="font-medium truncate">{asset.file_name}</p>
                      <p className="text-xs text-muted-foreground mb-2">Type: {asset.file_type}</p>
                      <a href={asset.file_url} target="_blank" className="text-blue-500 text-sm hover:underline">Download/View</a>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Project Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {communications.map(msg => (
                <div key={msg.id} className={`p-3 rounded-lg max-w-[80%] ${msg.sender_id === project.client_id ? 'bg-primary text-primary-foreground ml-auto' : 'bg-customBlueDark text-white mr-auto'}`}>
                  <p>{msg.message}</p>
                  <p className="text-[10px] opacity-70 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                <Button type="submit" isLoading={sending}>Send</Button>
              </form>
            </div>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}
