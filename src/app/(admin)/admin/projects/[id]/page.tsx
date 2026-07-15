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
import { toast } from "sonner";
import { addProjectCommunication } from "@/actions/project-actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminProjectDetailsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [financials, setFinancials] = useState<any[]>([]);
  const [communications, setCommunications] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
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
  
  const handleCreateFinancialDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await addProjectCommunication(params.id, newMessage);
      setNewMessage("");
      const { data: commsData } = await supabase.from("project_communications").select("*").eq("project_id", params.id).order("created_at", { ascending: true });
      setCommunications(commsData || []);
    } catch (error: any) {
      toast.error("Failed to send message: " + error.message);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
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
          <Badge variant="outline" className="capitalize text-sm">{project.status}</Badge>
        </div>
      </header>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
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
                    <div><h4 className="text-xs font-semibold text-slate-500 uppercase">Project Goals</h4><p className="whitespace-pre-wrap text-sm">{brief.project_goals || 'N/A'}</p></div>
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
                  <Button type="submit" className="w-full">Generate & Send</Button>
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
                <Button type="submit">Send</Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
           <Card>
             <CardHeader>
               <CardTitle>Manage Milestones</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground">Milestone tracking will be initialized in the next iteration.</p>
             </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
