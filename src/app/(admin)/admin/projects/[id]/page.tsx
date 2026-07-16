"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileUpload } from "@/components/shared/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { addProjectCommunication, updateProjectStatus, addMilestone, updateMilestoneStatus, updateMilestonePublish, uploadMilestoneReport, scheduleMeeting, updateMeetingStatus, editMilestone, deleteMilestone, editMeeting, deleteMeeting, updateMeetingPublish } from "@/actions/project-actions";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { cn, getProjectStatusColor, getMilestoneStatusColor, getMeetingStatusColor, sortMilestonesByDueDate } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";

export default function AdminProjectDetailsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [financials, setFinancials] = useState<any[]>([]);
  const [communications, setCommunications] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [editingMilestone, setEditingMilestone] = useState<any>(null);
  const [editingMeeting, setEditingMeeting] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      // Fetch Project + Brief
      const { data: projData } = await supabase
        .from("client_projects")
        .select("*, project_briefs(*), profiles(full_name, email)")
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
      const { data: milestoneData } = await supabase.from("project_milestones").select("*").eq("project_id", params.id);
      setMilestones(milestoneData ? [...milestoneData].sort(sortMilestonesByDueDate) : []);

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
      client_id: project.client_id, // ensure correct client id
      file_url,
      file_name,
      file_type,
      uploaded_by: userData.user.id
    }).select().single();

    if (error) {
      toast.error(error.message);
    } else {
      setAssets(prev => [...prev, data]);
      toast.success("Asset Uploaded");
    }
  };
  
  const [creatingFin, setCreatingFin] = useState(false);
  
  const handleCreateFinancialDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreatingFin(true);
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type") as string;
    const amount = formData.get("amount") as string;
    const desc = formData.get("description") as string;
    const file_url = formData.get("file_url") as string;
    
    const { error } = await supabase.from("project_financials").insert({
        project_id: params.id,
        client_id: project.client_id,
        type,
        amount: parseFloat(amount) || 0,
        description: desc,
        file_url: file_url || null,
        status: "sent"
    });
    
    if (error) toast.error(error.message);
    else {
      toast.success("Financial Document Sent");
      const { data: finData } = await supabase.from("project_financials").select("*").eq("project_id", params.id);
      setFinancials(finData || []);
      (e.target as HTMLFormElement).reset();
    }
    setCreatingFin(false);
  };

  const [sending, setSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await addProjectCommunication(params.id, newMessage);
      setNewMessage("");
      const { data: commsData } = await supabase.from("project_communications").select("*").eq("project_id", params.id).order("created_at", { ascending: true });
      setCommunications(commsData || []);
    } catch (error: any) {
      toast.error("Failed to send message: " + error.message);
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdatingStatus(true);
    try {
      await updateProjectStatus(params.id, newStatus);
      setProject({ ...project, status: newStatus });
      toast.success("Project status updated");
      
      const { data: milestoneData } = await supabase.from("project_milestones").select("*").eq("project_id", params.id);
      setMilestones(milestoneData ? [...milestoneData].sort(sortMilestonesByDueDate) : []);

      const { data: meetingData } = await supabase.from("project_meetings").select("*").eq("project_id", params.id).order("meeting_date", { ascending: true });
      setMeetings(meetingData || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const [addingMilestone, setAddingMilestone] = useState(false);
  
  const handleAddMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddingMilestone(true);
    const formData = new FormData(e.currentTarget);
    try {
      await addMilestone(
        params.id, 
        formData.get("title") as string, 
        formData.get("description") as string, 
        formData.get("due_date") as string
      );
      toast.success("Milestone added");
      const { data: milestoneData } = await supabase.from("project_milestones").select("*").eq("project_id", params.id);
      setMilestones(milestoneData ? [...milestoneData].sort(sortMilestonesByDueDate) : []);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setAddingMilestone(false);
    }
  };

  const handleMilestoneStatusChange = async (id: string, status: string) => {
    try {
      await updateMilestoneStatus(id, status, params.id);
      toast.success("Milestone updated");
      setMilestones(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const handleMilestonePublishToggle = async (id: string, is_published: boolean) => {
    try {
      await updateMilestonePublish(id, is_published, params.id);
      toast.success(is_published ? "Milestone published" : "Milestone set to draft");
      setMilestones(prev => prev.map(m => m.id === id ? { ...m, is_published } : m));
    } catch (error: any) {
      toast.error(error.message || "Failed to update publish state");
    }
  };

  const handleUploadMilestoneReport = async (id: string, file_url: string, file_name: string) => {
    try {
      await uploadMilestoneReport(id, params.id, file_url, file_name);
      toast.success("Report attached to milestone");
      setMilestones(prev => prev.map(m => m.id === id ? { ...m, report_file_url: file_url, report_file_name: file_name } : m));
    } catch (error: any) {
      toast.error(error.message || "Failed to attach report");
    }
  };

  const [schedulingMeeting, setSchedulingMeeting] = useState(false);
  
  const handleScheduleMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSchedulingMeeting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await scheduleMeeting(
        params.id, 
        formData.get("title") as string, 
        formData.get("description") as string, 
        formData.get("meeting_date") as string,
        formData.get("meeting_link") as string
      );
      toast.success("Meeting scheduled");
      const { data: meetingData } = await supabase.from("project_meetings").select("*").eq("project_id", params.id).order("meeting_date", { ascending: true });
      setMeetings(meetingData || []);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast.error(error.message || "Unexpected error scheduling meeting");
    } finally {
      setSchedulingMeeting(false);
    }
  };

  const handleMeetingStatusChange = async (id: string, status: string) => {
    try {
      await updateMeetingStatus(id, status, params.id);
      toast.success("Meeting updated");
      setMeetings(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    } catch (error: any) {
      toast.error(error.message || "Failed to update meeting");
    }
  };

  const handleMeetingPublishToggle = async (id: string, is_published: boolean) => {
    try {
      await updateMeetingPublish(id, is_published, params.id);
      toast.success(is_published ? "Meeting published" : "Meeting set to draft");
      setMeetings(prev => prev.map(m => m.id === id ? { ...m, is_published } : m));
    } catch (error: any) {
      toast.error(error.message || "Failed to update publish state");
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    if (!confirm("Are you sure you want to delete this milestone?")) return;
    try {
      await deleteMilestone(id, params.id);
      toast.success("Milestone deleted");
      setMilestones(prev => prev.filter(m => m.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete milestone");
    }
  };

  const handleDeleteMeeting = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meeting?")) return;
    try {
      await deleteMeeting(id, params.id);
      toast.success("Meeting deleted");
      setMeetings(prev => prev.filter(m => m.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete meeting");
    }
  };

  const submitEditMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await editMilestone(editingMilestone.id, params.id, formData.get("title") as string, formData.get("description") as string, formData.get("due_date") as string);
      toast.success("Milestone updated");
      const { data: milestoneData } = await supabase.from("project_milestones").select("*").eq("project_id", params.id);
      setMilestones(milestoneData ? [...milestoneData].sort(sortMilestonesByDueDate) : []);
      setEditingMilestone(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to update milestone");
    }
  };

  const submitEditMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await editMeeting(editingMeeting.id, params.id, formData.get("title") as string, formData.get("description") as string, formData.get("meeting_date") as string, formData.get("meeting_link") as string);
      toast.success("Meeting updated");
      const { data: meetingData } = await supabase.from("project_meetings").select("*").eq("project_id", params.id).order("meeting_date", { ascending: true });
      setMeetings(meetingData || []);
      setEditingMeeting(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to update meeting");
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="space-y-4">
        <Link href="/admin/projects" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground">Client: {project.profiles?.full_name} ({project.profiles?.email})</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={project.status} onValueChange={handleStatusChange} disabled={updatingStatus}>
              <SelectTrigger className={cn("w-[180px]", getProjectStatusColor(project.status))}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending Onboarding">Pending Onboarding</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

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
          {project.project_briefs && project.project_briefs.length > 0 ? (() => {
            const brief = project.project_briefs[0];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border shadow-sm">
                  <CardHeader className="bg-slate-50 border-b pb-4"><CardTitle className="text-lg">Project Scope</CardTitle></CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><h4 className="text-xs font-semibold text-slate-500 uppercase">Category</h4><p className="font-medium text-sm">{brief.solution_category || 'N/A'}</p></div>
                      <div><h4 className="text-xs font-semibold text-slate-500 uppercase">Specific Type</h4><p className="font-medium text-sm">{brief.specific_type || 'N/A'}</p></div>
                      <div><h4 className="text-xs font-semibold text-slate-500 uppercase">Industry</h4><p className="font-medium text-sm">{brief.industry || 'N/A'}</p></div>
                      <div><h4 className="text-xs font-semibold text-slate-500 uppercase">Client Segment</h4><p className="font-medium text-sm">{brief.client_segment || 'N/A'}</p></div>
                      <div className="col-span-2"><h4 className="text-xs font-semibold text-slate-500 uppercase">Company Name</h4><p className="font-medium text-sm">{brief.company_name || 'N/A'}</p></div>
                      <div className="col-span-2"><h4 className="text-xs font-semibold text-slate-500 uppercase">Payment Policy Accepted</h4><p className="font-medium text-sm">{brief.payment_policy_accepted ? 'Yes' : 'No'}</p></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm">
                  <CardHeader className="bg-slate-50 border-b pb-4"><CardTitle className="text-lg">Target Market & Competitors</CardTitle></CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Target Market Details</h4>
                      {brief.target_market_details ? (
                        <div className="bg-slate-50 p-3 rounded-md border text-sm space-y-1">
                          <p><span className="font-medium text-slate-600">Market:</span> {brief.target_market_details.market || 'N/A'}</p>
                          <p><span className="font-medium text-slate-600">Demographics:</span> {brief.target_market_details.demographics || 'N/A'}</p>
                          <p><span className="font-medium text-slate-600">Characteristics:</span> {brief.target_market_details.characteristics || 'N/A'}</p>
                        </div>
                      ) : <p className="text-sm text-slate-500">N/A</p>}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Competitors List</h4>
                      {brief.competitors_list && brief.competitors_list.length > 0 ? (
                        <ul className="space-y-2">
                          {brief.competitors_list.map((comp: any, idx: number) => (
                            <li key={idx} className="bg-slate-50 p-2 rounded-md border text-sm flex flex-col">
                              <span className="font-semibold">{comp.name}</span>
                              {comp.link && <a href={comp.link} target="_blank" className="text-blue-500 hover:underline break-all text-xs">{comp.link}</a>}
                            </li>
                          ))}
                        </ul>
                      ) : <p className="text-sm text-slate-500">No competitors listed.</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 border shadow-sm">
                  <CardHeader className="bg-slate-50 border-b pb-4"><CardTitle className="text-lg">Goals & Notes</CardTitle></CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Project Goals</h4>
                      <div 
                        className="text-sm ql-editor px-0" 
                        dangerouslySetInnerHTML={{ __html: brief.project_goals || 'N/A' }} 
                      />
                    </div>
                    <div><h4 className="text-xs font-semibold text-slate-500 uppercase">Additional Notes</h4><p className="whitespace-pre-wrap text-sm">{brief.additional_notes || 'N/A'}</p></div>
                  </CardContent>
                </Card>
              </div>
            );
          })() : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">No onboarding brief found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Financial Records</CardTitle></CardHeader>
              <CardContent>
                {financials.length === 0 ? <p className="text-muted-foreground">No records.</p> : (
                  <ul className="space-y-4">
                    {financials.map(fin => (
                      <li key={fin.id} className="p-4 border rounded-md relative">
                        <div className="flex justify-between font-semibold capitalize">
                          <span>{fin.type.replace('_', ' ')}</span>
                          <span className="text-blue-600">{fin.currency || 'USD'} {fin.amount}</span>
                        </div>
                        <p className="text-sm mt-1">{fin.description}</p>
                        <Badge variant="secondary" className="mt-2 text-xs">{fin.status}</Badge>
                        {fin.file_url && <a href={fin.file_url} target="_blank" className="text-blue-500 text-sm hover:underline absolute bottom-4 right-4">View Doc</a>}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Create Quote/Invoice</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleCreateFinancialDoc} className="space-y-4">
                  <select name="type" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                    <option value="quotation">Quotation</option>
                    <option value="invoice">Invoice</option>
                    <option value="receipt">Receipt</option>
                  </select>
                  <Input name="amount" type="number" placeholder="Amount ($)" required />
                  <Textarea name="description" placeholder="Description / Terms" required />
                  <Input name="file_url" type="url" placeholder="Optional PDF URL (Cloudinary link)" />
                  <Button type="submit" isLoading={creatingFin} className="w-full">Generate & Send</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Project Assets</CardTitle>
                <CardDescription>Files uploaded by client or admin</CardDescription>
              </div>
              <FileUpload onUploadSuccess={handleUploadAsset} buttonText="Upload File" />
            </CardHeader>
            <CardContent>
              {assets.length === 0 ? <p className="text-muted-foreground">No assets uploaded.</p> : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {assets.map(asset => (
                    <div key={asset.id} className="p-4 border rounded-md shadow-sm">
                      <p className="font-medium truncate" title={asset.file_name}>{asset.file_name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{asset.file_type}</p>
                      <a href={asset.file_url} target="_blank" className="text-blue-600 text-sm hover:underline">Download / View</a>
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
              <CardTitle>Project Messages (Admin View)</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {communications.map(msg => (
                <div key={msg.id} className={`p-3 rounded-lg max-w-[80%] ${msg.sender_id === project.client_id ? 'bg-muted mr-auto' : 'bg-customBlueDark text-white ml-auto'}`}>
                  <p>{msg.message}</p>
                  <p className="text-[10px] opacity-70 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
              ))}
              {communications.length === 0 && <p className="text-center text-muted-foreground mt-10">No messages yet. Start the conversation!</p>}
            </CardContent>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message to client..." />
                <Button type="submit" isLoading={sending}>Send</Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
                <CardDescription>Track project progress</CardDescription>
              </CardHeader>
              <CardContent>
                {milestones.length === 0 ? <p className="text-muted-foreground">No milestones created yet.</p> : (
                  <div className="space-y-4">
                    {milestones.map(milestone => (
                      <div key={milestone.id} className={`p-4 border rounded-lg relative ${!milestone.is_published ? 'bg-slate-50 border-dashed' : 'bg-white'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {milestone.title}
                              {!milestone.is_published && <Badge variant="secondary" className="text-[10px]">Draft</Badge>}
                            </h4>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" onClick={() => setEditingMilestone(milestone)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteMilestone(milestone.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <label className="text-xs flex items-center gap-1 cursor-pointer font-medium text-slate-600">
                              <input 
                                type="checkbox" 
                                checked={milestone.is_published}
                                onChange={(e) => handleMilestonePublishToggle(milestone.id, e.target.checked)}
                              />
                              Publish
                            </label>
                            <Select 
                              value={milestone.status} 
                              onValueChange={(val) => handleMilestoneStatusChange(milestone.id, val)}
                            >
                              <SelectTrigger className={cn("w-[120px] h-8 text-xs capitalize", getMilestoneStatusColor(milestone.status))}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {milestone.description && <p className="text-sm text-slate-600 mb-2">{milestone.description}</p>}
                        {milestone.due_date && <p className="text-xs text-slate-500 mb-4">Due: {new Date(milestone.due_date).toLocaleDateString()}</p>}
                        
                        <div className="pt-2 border-t mt-2">
                          <h5 className="text-xs font-semibold mb-2">Milestone Report</h5>
                          {milestone.report_file_url ? (
                            <div className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded">
                              <a href={milestone.report_file_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                {milestone.report_file_name || 'View Report'}
                              </a>
                              <Button variant="ghost" size="sm" onClick={() => handleUploadMilestoneReport(milestone.id, '', '')} className="text-xs text-red-500 h-6 px-2">Remove</Button>
                            </div>
                          ) : (
                            <FileUpload 
                              onUploadSuccess={(url, name) => handleUploadMilestoneReport(milestone.id, url, name)}
                              className="text-xs"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMilestone} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" required placeholder="e.g. Wireframes Approved" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" placeholder="Optional details..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <Input name="due_date" type="date" />
                  </div>
                  <Button type="submit" isLoading={addingMilestone} className="w-full">Create Milestone</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Meetings</CardTitle>
                <CardDescription>Upcoming and past meetings</CardDescription>
              </CardHeader>
              <CardContent>
                {meetings.length === 0 ? <p className="text-muted-foreground">No meetings scheduled.</p> : (
                  <div className="space-y-4">
                    {meetings.map(meeting => (
                      <div key={meeting.id} className={`p-4 border rounded-lg relative ${!meeting.is_published ? 'bg-slate-50 border-dashed' : 'bg-white'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {meeting.title}
                              {!meeting.is_published && <Badge variant="secondary" className="text-[10px]">Draft</Badge>}
                            </h4>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" onClick={() => setEditingMeeting(meeting)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteMeeting(meeting.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <label className="text-xs flex items-center gap-1 cursor-pointer font-medium text-slate-600">
                              <input 
                                type="checkbox" 
                                checked={meeting.is_published}
                                onChange={(e) => handleMeetingPublishToggle(meeting.id, e.target.checked)}
                              />
                              Publish
                            </label>
                            <Select 
                              value={meeting.status} 
                              onValueChange={(val) => handleMeetingStatusChange(meeting.id, val)}
                            >
                            <SelectTrigger className={cn("w-[130px] h-8 text-xs capitalize", getMeetingStatusColor(meeting.status))}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          </div>
                        </div>
                        {meeting.description && <p className="text-sm text-slate-600 mb-2">{meeting.description}</p>}
                        <div className="text-sm space-y-1">
                          <p><span className="font-medium">Date:</span> {new Date(meeting.meeting_date).toLocaleString()}</p>
                          <p><span className="font-medium">Link:</span> <a href={meeting.meeting_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Join Meeting</a></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScheduleMeeting} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meeting Title</label>
                    <Input name="title" required placeholder="e.g. Kickoff Call" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" placeholder="Optional details or agenda..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date & Time</label>
                    <Input name="meeting_date" type="datetime-local" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meeting Link (URL)</label>
                    <Input name="meeting_link" type="url" required placeholder="https://zoom.us/j/..." />
                  </div>
                  <Button type="submit" isLoading={schedulingMeeting} className="w-full">Schedule Meeting</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
      {/* Edit Milestone Dialog */}
      <Dialog open={!!editingMilestone} onOpenChange={(open) => !open && setEditingMilestone(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
          </DialogHeader>
          {editingMilestone && (
            <form onSubmit={submitEditMilestone} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" defaultValue={editingMilestone.title} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea name="description" defaultValue={editingMilestone.description || ""} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <Input name="due_date" type="date" defaultValue={editingMilestone.due_date || ""} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditingMilestone(null)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Meeting Dialog */}
      <Dialog open={!!editingMeeting} onOpenChange={(open) => !open && setEditingMeeting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Meeting</DialogTitle>
          </DialogHeader>
          {editingMeeting && (
            <form onSubmit={submitEditMeeting} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" defaultValue={editingMeeting.title} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea name="description" defaultValue={editingMeeting.description || ""} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date & Time</label>
                <Input name="meeting_date" type="datetime-local" defaultValue={new Date(editingMeeting.meeting_date).toISOString().slice(0,16)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Meeting Link</label>
                <Input name="meeting_link" defaultValue={editingMeeting.meeting_link} required />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditingMeeting(null)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
