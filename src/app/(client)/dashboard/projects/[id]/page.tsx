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

  if (!project) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground">Status: <span className="font-semibold text-primary">{project.status}</span></p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Project Brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.project_briefs && project.project_briefs.length > 0 ? (
                <>
                  <div>
                    <h4 className="font-semibold">Company</h4>
                    <p>{project.project_briefs[0].company_name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Goals</h4>
                    <div 
                      className="text-sm ql-editor px-0" 
                      dangerouslySetInnerHTML={{ __html: project.project_briefs[0].project_goals }} 
                    />
                  </div>
                </>
              ) : (
                <p>No brief found.</p>
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
        
        {/* Milestones Tab */}
        <TabsContent value="milestones">
           <Card>
             <CardHeader>
               <CardTitle>Milestones & Progress</CardTitle>
             </CardHeader>
             <CardContent>
               {(() => {
                 const publishedMilestones = milestones.filter(m => m.is_published);
                 const completedMilestones = publishedMilestones.filter(m => m.status === 'completed');
                 const progressPercent = publishedMilestones.length > 0 ? Math.round((completedMilestones.length / publishedMilestones.length) * 100) : 0;
                 
                 return publishedMilestones.length === 0 ? <p className="text-muted-foreground">Milestones will be set up by your project manager shortly.</p> : (
                   <div className="space-y-6">
                     <div className="space-y-2">
                       <div className="flex justify-between text-sm font-medium">
                         <span>Overall Progress</span>
                         <span>{progressPercent}%</span>
                       </div>
                       <Progress value={progressPercent} className="h-2" />
                     </div>
                     <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                       {publishedMilestones.map((milestone, index) => (
                         <div key={milestone.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                           <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-slate-300'}`}>
                             <span className="text-white text-xs font-bold">{index + 1}</span>
                           </div>
                           <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-white shadow-sm">
                             <div className="flex justify-between items-start mb-2">
                               <h4 className="font-semibold">{milestone.title}</h4>
                               <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                                 milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                                 milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                 'bg-slate-100 text-slate-700'
                               }`}>
                                 {milestone.status.replace('_', ' ')}
                               </span>
                             </div>
                             {milestone.description && <p className="text-sm text-slate-600 mb-2">{milestone.description}</p>}
                             {milestone.due_date && <p className="text-xs text-slate-500 font-medium">Due: {new Date(milestone.due_date).toLocaleDateString()}</p>}
                             
                             {milestone.report_file_url && (
                               <div className="mt-3 pt-3 border-t">
                                 <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
                                   <a href={milestone.report_file_url} target="_blank" rel="noreferrer">
                                     {milestone.report_file_name || 'Download Milestone Report'}
                                   </a>
                                 </Button>
                               </div>
                             )}
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 );
               })()}
             </CardContent>
           </Card>
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              {meetings.length === 0 ? <p className="text-muted-foreground">You have no upcoming meetings.</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {meetings.map(meeting => (
                    <div key={meeting.id} className="p-4 border rounded-lg bg-white shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{meeting.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          meeting.status === 'completed' ? 'bg-green-100 text-green-700' :
                          meeting.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                      {meeting.description && <p className="text-sm text-slate-600 mb-4 flex-1">{meeting.description}</p>}
                      <div className="mt-auto space-y-4">
                        <div className="text-sm bg-slate-50 p-2 rounded border">
                          <p><span className="font-medium text-slate-500">Date & Time:</span> <br/>{new Date(meeting.meeting_date).toLocaleString()}</p>
                        </div>
                        {meeting.status === 'scheduled' && (
                          <Button asChild className="w-full">
                            <a href={meeting.meeting_link} target="_blank" rel="noreferrer">
                              Join Meeting
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
